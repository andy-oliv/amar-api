import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { LoginDTO } from './dto/login-dto';
import { Throttle } from '@nestjs/throttler';
import { LoggedUser } from 'src/interfaces/LoggedUser';
import { Logger } from 'nestjs-pino';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from './guards/login/login.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  @ApiQuery({
    name: 'resetToken',
    type: 'string',
    description:
      'Token generated automatically when a password reset is requested.',
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 200,
    description: 'Redirect to password update page.',
  })
  @Get()
  async updateTokenPassword(@Query() { resetToken }: { resetToken: string }) {
    const loggedUser: LoggedUser =
      await this.authService.verifyToken(resetToken);
    this.logger.log(loggedUser);
  }

  @UseGuards(LoginGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.LOGIN_200_PT,
  })
  @ApiResponse({
    status: 400,
    description: HTTP_MESSAGES.LOGIN_400_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.LOGIN_500_PT,
  })
  @Throttle({ default: { limit: 3, ttl: 60000 } }) //max 3 requests per minute
  @Post('login')
  async login(
    @Body() { email, password }: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokens: { accessToken: string; refreshToken: string } =
      await this.authService.login({
        email,
        password,
      });

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: 900000, //expires in 15min
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: true,
      maxAge: 2592000000, //exapires in 30 days
    });

    this.logger.log('Novo login');
    return { message: HTTP_MESSAGES.LOGIN_200_PT };
  }

  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.LOGOUT_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_GUARD_500_PT,
  })
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.clearCookie('refreshToken');
      this.logger.log(HTTP_MESSAGES.LOGOUT_200);
      return { message: HTTP_MESSAGES.LOGOUT_200_PT };
    }
    const loggedUser: LoggedUser =
      await this.authService.verifyToken(accessToken);
    await this.prismaService.user.update({
      where: {
        email: loggedUser.email,
      },
      data: {
        refreshToken: null,
      },
    });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    this.logger.log(HTTP_MESSAGES.LOGOUT_200);
    return { message: HTTP_MESSAGES.LOGOUT_200_PT };
  }
}
