import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoggedUser } from '../interfaces/LoggedUser';
import HTTP_MESSAGES from '../common/httpMessages';
import { User } from '../interfaces/User';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async generateToken(
    payload: LoggedUser,
    duration: number | string,
  ): Promise<string> {
    try {
      const token: string = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: duration, //in seconds
        issuer: 'Amar API',
      });
      return token;
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.TOKEN_GENERATE_500, { error: error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.TOKEN_GENERATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async verifyToken(token: string): Promise<LoggedUser> {
    try {
      const verifiedToken: LoggedUser =
        await this.jwtService.verifyAsync(token);
      return verifiedToken;
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.VERIFY_JWT_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.VERIFY_JWT_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async login({
    email,
    password,
  }: Partial<User>): Promise<{ accessToken: string; refreshToken: string }> {
    const user: User = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      this.logger.error(HTTP_MESSAGES.EMAIL_LOGIN_400, { error: user });
      throw new BadRequestException(HTTP_MESSAGES.LOGIN_400_PT);
    }

    const verifyPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!verifyPassword) {
      this.logger.error(HTTP_MESSAGES.PASSWORD_LOGIN_400, {
        error: verifyPassword,
      });
      throw new BadRequestException(HTTP_MESSAGES.LOGIN_400_PT);
    }

    const accessToken: string = await this.generateToken(
      {
        name: user.name,
        email: user.email,
      },
      900, //duration = 15min
    );

    const refreshToken: string = await this.generateToken(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      '30d',
    );

    const currentDate = dayjs();
    const futureDate = currentDate.add(30, 'day');

    try {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken,
          tokenIssueDate: futureDate.format('DD/MM/YYYY'),
        },
      });

      return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.LOGIN_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.LOGIN_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
