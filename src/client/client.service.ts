import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { Client } from 'src/interfaces/Client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export class ClientService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createClient(
    client: Client,
  ): Promise<{ message: string; data: Client }> {
    const clientFound: Client = await this.prismaService.client.findFirst({
      where: {
        email: client.email,
      },
    });

    if (clientFound) {
      this.logger.error(HTTP_MESSAGES.EMAIL_409);
      throw new ConflictException({
        message: HTTP_MESSAGES.EMAIL_409_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const id: string = uuidv4();

    try {
      const newClient: Client = await this.prismaService.client.create({
        data: {
          id,
          name: client.name,
          email: client.email,
          phoneNumber: client.phoneNumber,
          address: client.address,
          city: client.city,
          rg: client.rg,
          cpf: client.cpf,
          instagram: client.instagram,
        },
      });

      return { message: HTTP_MESSAGES.CLIENT_CREATE_201_PT, data: newClient };
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.error(HTTP_MESSAGES.CPF_RG_409, { error });
        throw new ConflictException({
          message: HTTP_MESSAGES.CPF_RG_409_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }
      this.logger.error(HTTP_MESSAGES.CLIENT_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CLIENT_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async findAll(): Promise<{ message: string; data: Client[] }> {
    const clientList: Client[] = await this.prismaService.client.findMany();

    if (clientList.length === 0) {
      this.logger.error(HTTP_MESSAGES.CLIENTS_FETCH_404, clientList);
      throw new NotFoundException({
        message: HTTP_MESSAGES.CLIENTS_FETCH_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return { message: HTTP_MESSAGES.CLIENTS_FETCH_200_PT, data: clientList };
  }

  async findOne(id: string): Promise<{ message: string; data: Client }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.UUID_INVALID, {
        error: validateId,
      });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const client: Client = await this.prismaService.client.findFirst({
      where: {
        id,
      },
      include: {
        children: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!client) {
      this.logger.error(HTTP_MESSAGES.CLIENT_FETCH_404, { error: client });
      throw new NotFoundException({
        message: HTTP_MESSAGES.CLIENT_FETCH_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return { message: HTTP_MESSAGES.CLIENT_FETCH_200_PT, data: client };
  }

  async updateClient(
    id: string,
    updatedData: Partial<Client>,
  ): Promise<{ message: string; data: Client }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.UUID_INVALID, {
        error: validateId,
      });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const client: Client = await this.prismaService.client.findFirst({
      where: {
        id,
      },
    });

    if (!client) {
      this.logger.error(HTTP_MESSAGES.CLIENT_FETCH_404, { error: client });
      throw new NotFoundException({
        message: HTTP_MESSAGES.CLIENT_FETCH_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    if (updatedData.email) {
      const emailExists: boolean = (await this.prismaService.client.findFirst({
        where: {
          email: updatedData.email,
        },
      }))
        ? true
        : false;

      if (emailExists) {
        this.logger.error(HTTP_MESSAGES.EMAIL_409, { error: emailExists });
        throw new ConflictException({
          message: HTTP_MESSAGES.EMAIL_409_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }
    }

    try {
      const updatedClient: Client = await this.prismaService.client.update({
        where: {
          id,
        },
        data: updatedData,
      });
      return {
        message: HTTP_MESSAGES.CLIENT_UPDATE_200_PT,
        data: updatedClient,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.CLIENT_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CLIENT_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteClient(id: string): Promise<{ message: string }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.UUID_INVALID, {
        error: validateId,
      });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    const client: Client = await this.prismaService.client.findFirst({
      where: {
        id,
      },
    });

    if (!client) {
      this.logger.error(HTTP_MESSAGES.CLIENT_FETCH_404, { error: client });
      throw new NotFoundException({
        message: HTTP_MESSAGES.CLIENT_FETCH_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      await this.prismaService.client.delete({
        where: {
          id,
        },
      });

      return { message: HTTP_MESSAGES.CLIENT_DELETE_200_PT };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.CLIENT_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CLIENT_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
