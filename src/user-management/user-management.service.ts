import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { validate as uuidValidate } from 'uuid';
import * as sgMail from '@sendgrid/mail';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/User';
import HTTP_MESSAGES from '../common/httpMessages';
import VALIDATION_MESSAGES from '../common/validationMessages';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  async sendEmailToken(email: string) {
    const user: User = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    const token: string = await this.authService.generateToken(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      900, //duration = 15min
    );
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'amarinfancias@gmail.com',
      subject: 'Atualização de senha',
      text: 'Olá! Este é um email automático enviado pelo sistema da Amar Infâncias. Favor acessar este endereço para fazer o processo de atualização de senha. Caso você não tenha feito esta solicitação, ignore este email.',
      html: `Olá! Este é um email automático enviado pelo sistema da Amar Infâncias. Favor acessar <a href="http://localhost:3000/auth?resetToken=${token}" target="_blank">este endereço</a> para fazer o processo de atualização de senha. <br><br>Caso você não tenha feito esta solicitação, ignore este email.<br><br><strong>Com amor,</strong><br><img src="${__dirname + 'public\logo.png'}" style="width:500px;"><br><a href="https://www.instagram.com/amarinfancias/?igshid=YmMyMTA2M2Y%3D" target="_blank">Instagram</a><br><a href="https://wa.me/message/6NC6NPP2C352H1" target="_blank">Whatsapp</a>`,
    };
    try {
      await sgMail.send(msg);
      this.logger.log('Email sent');

      return {
        message:
          'Se o endereço de email enviado fizer parte do nosso sistema, um email com mais informações chegará. Verifique a caixa de entrada e a caixa de spam.',
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.SENDGRID_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.SENDGRID_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async idValidation(id: string) {
    const validId: boolean = uuidValidate(id);

    if (!validId) {
      this.logger.error(VALIDATION_MESSAGES.UUID_INVALID, { error: validId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async findUser(id: string): Promise<User> {
    const user: User = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      this.logger.error(HTTP_MESSAGES.USER_404, { error: user });
      throw new BadRequestException({
        message: HTTP_MESSAGES.USER_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return user;
  }
}
