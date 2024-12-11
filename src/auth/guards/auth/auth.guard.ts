import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import { AuthService } from 'src/auth/auth.service';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { LoggedUser } from 'src/interfaces/LoggedUser';
import { User } from 'src/interfaces/User';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    if (request.cookies.accessToken) {
      this.logger.log('accessToken present... Proceeding the request.');
      return true;
    }

    if (!request.cookies.refreshToken) {
      this.logger.error(HTTP_MESSAGES.LOGIN_GUARD_500);
      response
        .status(403)
        .json({ message: HTTP_MESSAGES.LOGIN_SESSION_403_PT });
    }

    const loggedUser: LoggedUser = await this.authService.verifyToken(
      request.cookies.refreshToken,
    );

    if (loggedUser) {
      this.logger.log(
        'User has no accessToken but refeshToken was found! Proceeding to the generation of a new accessToken',
      );
      const user: User = await this.prismaService.user.findFirst({
        where: {
          email: loggedUser.email,
        },
      });

      if (!user) {
        this.logger.error(HTTP_MESSAGES.USER_404);
        response.status(403).json({ message: HTTP_MESSAGES.LOGIN_403_PT });
      }

      const currentDate = dayjs().format('DD/MM/YYYY');

      if (
        user.refreshToken !== request.cookies.refreshToken ||
        dayjs(user.tokenIssueDate) <= dayjs(currentDate)
      ) {
        this.logger.error(HTTP_MESSAGES.LOGIN_GUARD_500);
        response
          .status(403)
          .json({ message: HTTP_MESSAGES.LOGIN_GUARD_500_PT });
      }

      const newAccessToken: string = await this.authService.generateToken(
        { name: user.name, email: user.email },
        900,
      );
      response.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: true,
        maxAge: 900000,
      });

      return true;
    }
  }
}
