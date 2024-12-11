import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import { AuthService } from 'src/auth/auth.service';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    if (req.cookies.accessToken) {
      this.logger.log('User already logged in. Redirecting to the dashboard');
      res.status(200).json({ message: HTTP_MESSAGES.LOGIN_200_PT });
      return false;
    }

    this.logger.log(
      'No active session detected. Proceeding with the login process.',
    );
    return true;
  }
}
