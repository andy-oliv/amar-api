import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { Extraservice } from 'src/interfaces/ExtraService';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ExtraServiceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createExtraService(serviceData: Extraservice): Promise<{
    message: string;
    data: Extraservice;
  }> {
    try {
      const newExtraService: Extraservice =
        await this.prismaService.extraService.create({
          data: serviceData,
        });

      return {
        message: HTTP_MESSAGES.EXTRASERVICE_CREATE_201_PT,
        data: newExtraService,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.EXTRASERVICE_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICE_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchAll(): Promise<{ message: string; data: Extraservice[] }> {
    try {
      const extraServiceList: Extraservice[] =
        await this.prismaService.extraService.findMany();

      if (extraServiceList.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.EXTRASERVICES_FETCH_200_PT,
        data: extraServiceList,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.EXTRASERVICES_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXTRASERVICES_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXTRASERVICES_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICES_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchOne(id: number): Promise<{ message: string; data: Extraservice }> {
    try {
      const extraService: Extraservice =
        await this.prismaService.extraService.findFirst({
          where: {
            id,
          },
          include: {
            contractService: {
              select: {
                contract: {
                  select: {
                    id: true,
                    event: true,
                    isSigned: true,
                    value: true,
                    package: true,
                  },
                },
              },
            },
          },
        });

      if (extraService === null) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.EXTRASERVICE_FETCH_200_PT,
        data: extraService,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.EXTRASERVICE_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXTRASERVICE_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXTRASERVICE_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICE_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updateExtraService(
    id: number,
    updatedData: Partial<Extraservice>,
  ): Promise<{ message: string; data: Extraservice }> {
    try {
      const updatedService: Extraservice =
        await this.prismaService.extraService.update({
          where: {
            id,
          },
          data: updatedData,
        });

      return {
        message: HTTP_MESSAGES.EXTRASERVICE_UPDATE_200_PT,
        data: updatedService,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EXTRASERVICE_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXTRASERVICE_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXTRASERVICE_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICE_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteExtraService(id: number): Promise<{ message: string }> {
    try {
      await this.prismaService.extraService.delete({
        where: {
          id,
        },
      });

      return {
        message: HTTP_MESSAGES.EXTRASERVICE_DELETE_200_PT,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EXTRASERVICE_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXTRASERVICE_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXTRASERVICE_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXTRASERVICE_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
