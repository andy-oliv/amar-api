import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Logger } from 'nestjs-pino';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../interfaces/User';
import { UserManagementService } from '../user-management/user-management.service';
import HTTP_MESSAGES from '../common/httpMessages';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly userManagementService: UserManagementService,
  ) {}

  async createUser(user: User): Promise<{ message: string; data: User }> {
    const userFound: User = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userFound) {
      this.logger.error(HTTP_MESSAGES.EMAIL_409, {
        error: userFound.email,
      });
      throw new ConflictException({
        message: HTTP_MESSAGES.EMAIL_409_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const saltRounds: number | void = process.env.SALT_ROUNDS
      ? parseInt(process.env.SALT_ROUNDS)
      : 12;

    if (Number.isNaN(saltRounds)) {
      this.logger.error(HTTP_MESSAGES.SALT_ROUNDS_500, { error: saltRounds });
      throw new ServiceUnavailableException({
        message: HTTP_MESSAGES.ENVIRONMENT_VARIABLES_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const hash: string = await bcrypt.hash(user.password, saltRounds);
    const id: string = uuidv4();

    try {
      const newUser: User = await this.prismaService.user.create({
        data: {
          id: id,
          name: user.name,
          email: user.email,
          password: hash,
          pictureUrl: '../assets/avatar_placeholder.png',
        },
      });
      return { message: HTTP_MESSAGES.USER_201_PT, data: newUser };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.USER_CREATE_500, { error: error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.USER_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async findAll(): Promise<{ message: string; data: User[] }> {
    const userList: User[] = await this.prismaService.user.findMany();

    if (userList.length === 0) {
      this.logger.error(HTTP_MESSAGES.USERS_404, { error: userList });
      throw new NotFoundException({
        message: HTTP_MESSAGES.USERS_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return {
      message: 'Lista de usuários encontrados no sistema',
      data: userList,
    };
  }

  async findOne(userId: string): Promise<{ message: string; data: User }> {
    await this.userManagementService.idValidation(userId);

    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      this.logger.error(HTTP_MESSAGES.USER_404, { error: user });
      throw new NotFoundException({
        message: HTTP_MESSAGES.USER_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return { message: HTTP_MESSAGES.USER_FETCH_200_PT, data: user };
  }

  async updateUser(
    user: Partial<User>,
  ): Promise<{ message: string; data: User }> {
    await this.userManagementService.idValidation(user.id);

    const foundUser: User = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!foundUser) {
      this.logger.error(HTTP_MESSAGES.USER_404, { error: foundUser });
      throw new NotFoundException({
        message: HTTP_MESSAGES.USER_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      const updatedUser: User = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          pictureUrl: user.pictureUrl,
        },
      });

      return {
        message: HTTP_MESSAGES.USER_UPDATE_200_PT,
        data: updatedUser,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(HTTP_MESSAGES.EMAIL_409, { error });
        throw new ConflictException({
          message: HTTP_MESSAGES.EMAIL_409_PT,
        });
      }
      this.logger.error(HTTP_MESSAGES.USER_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.USER_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updatePassword(
    id: string,
    password: string,
  ): Promise<{ message: string }> {
    await this.userManagementService.idValidation(id);

    const user: User = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      this.logger.error(HTTP_MESSAGES.USER_404, { error: user });
      throw new NotFoundException({
        message: HTTP_MESSAGES.USER_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const passwordCheck: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (passwordCheck) {
      this.logger.error(HTTP_MESSAGES.PASSWORD_UPDATE_409);
      throw new ConflictException({
        message: HTTP_MESSAGES.PASSWORD_UPDATE_409_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const hash: string = await bcrypt.hash(
      password,
      process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 12,
    );

    try {
      await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          password: hash,
        },
      });

      return { message: HTTP_MESSAGES.PASSWORD_UPDATE_200_PT };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.PASSWORD_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.PASSWORD_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    await this.userManagementService.idValidation(userId);

    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      this.logger.error(HTTP_MESSAGES.USER_404, { error: user });
      throw new NotFoundException({
        message: HTTP_MESSAGES.USER_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });

      return { message: HTTP_MESSAGES.USER_DELETE_200_PT };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.USER_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.USER_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
