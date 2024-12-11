import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ContractServiceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async addExtraService(data: {
    contractId: string;
    extraServiceId: number;
  }): Promise<{ message: string }> {
    try {
      await this.prismaService.contractService.create({
        data: {
          contractId: data.contractId,
          extraServiceId: data.extraServiceId,
        },
      });

      return { message: HTTP_MESSAGES.EXTRASERVICE_ADD_200_PT };
    } catch (error) {
      if (error.code === 'P2003') {
        this.logger.error(HTTP_MESSAGES.EXTRASERVICE_ADD_400, { error });
        throw new BadRequestException({
          message: HTTP_MESSAGES.EXTRASERVICE_ADD_400_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXTRASERVICE_ADD_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICE_ADD_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async removeExtraService(id: number): Promise<{ message: string }> {
    try {
      await this.prismaService.contractService.delete({
        where: {
          id,
        },
      });

      return { message: HTTP_MESSAGES.EXTRASERVICE_REMOVE_200_PT };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EXTRASERVICE_REMOVE_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXTRASERVICE_REMOVE_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXTRASERVICE_REMOVE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICE_REMOVE_500_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
