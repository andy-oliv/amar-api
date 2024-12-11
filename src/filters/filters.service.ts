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
export class FiltersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async getAllContracts(): Promise<{ message: string; data: number }> {
    try {
      const totalContracts: number = await this.prismaService.contract.count();

      return {
        message: HTTP_MESSAGES.FILTERS_CONTRACTS_200_PT,
        data: totalContracts,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async getContractsByPackage(
    servicePackage: string,
  ): Promise<{ message: string; data: number }> {
    servicePackage = servicePackage.toUpperCase();
    if (!['NUVEM', 'CEU', 'SOL', 'LUA', 'COMETA'].includes(servicePackage)) {
      this.logger.error(HTTP_MESSAGES.FILTERS_CONTRACTS_PACKAGE_400);
      throw new BadRequestException({
        message: HTTP_MESSAGES.FILTERS_CONTRACTS_PACKAGE_400_PT,
      });
    }

    try {
      const totalContracts: number = await this.prismaService.contract.count({
        where: {
          package: servicePackage.toUpperCase(),
        },
      });

      return {
        message: HTTP_MESSAGES.FILTERS_CONTRACTS_200_PT,
        data: totalContracts,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async getContractsByMonth(
    year: string,
  ): Promise<{ message: string; data: any }> {
    try {
      const totalContracts = await this.prismaService.contract.groupBy({
        by: ['date'],
        where: {
          date: {
            contains: year,
          },
        },
        _count: {
          id: true,
        },
        orderBy: {
          date: 'asc',
        },
      });

      return {
        message: HTTP_MESSAGES.FILTERS_CONTRACTS_200_PT,
        data: totalContracts,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async countAllClients(): Promise<{ message: string; data: number }> {
    try {
      const totalClients: number = await this.prismaService.client.count();

      return {
        message: HTTP_MESSAGES.FILTERS_CLIENTS_200_PT,
        data: totalClients,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async getClientsByCity(): Promise<{ message: string; data: any }> {
    try {
      const totalClients: any = await this.prismaService.client.groupBy({
        by: ['city'],
        _count: {
          city: true,
        },
        orderBy: {
          city: 'asc',
        },
      });

      return {
        message: HTTP_MESSAGES.FILTERS_CLIENTS_200_PT,
        data: totalClients,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async sumAllFinancialRecords(
    type: string,
  ): Promise<{ message: string; data: any }> {
    if (!['DESPESA', 'RECEITA'].includes(type.toUpperCase())) {
      this.logger.error(HTTP_MESSAGES.FILTERS_FINANCES_TYPE_400);
      throw new BadRequestException({
        message: HTTP_MESSAGES.FILTERS_FINANCES_TYPE_400_PT,
      });
    }
    try {
      const totalRecords: any =
        await this.prismaService.financialRecord.groupBy({
          by: ['type'],
          where: {
            type: type,
          },
          _sum: {
            amount: true,
          },
        });

      if (totalRecords.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }
      return {
        message: HTTP_MESSAGES.FILTERS_FINANCES_200_PT,
        data: totalRecords,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.FILTERS_FINANCES_TYPE_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FILTERS_FINANCES_TYPE_404_PT,
        });
      }

      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async sumFinancialRecordsMonthly(year: number): Promise<{
    message: string;
    data: any;
  }> {
    try {
      const totalRecords: any =
        await this.prismaService.financialRecord.groupBy({
          by: ['month'],
          where: {
            type: {
              equals: 'RECEITA',
            },
            year: {
              equals: year,
            },
          },
          _sum: {
            amount: true,
          },
          orderBy: {
            month: 'asc',
          },
        });

      if (totalRecords.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.FILTERS_FINANCES_200_PT,
        data: totalRecords,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.FILTERS_FINANCES_YEAR_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FILTERS_FINANCES_YEAR_404_PT,
        });
      }

      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async sumFinancialRecordsYearly(): Promise<{
    message: string;
    data: any;
  }> {
    try {
      const totalRecords: any =
        await this.prismaService.financialRecord.groupBy({
          by: ['year'],
          where: {
            type: {
              equals: 'RECEITA',
            },
          },
          _sum: {
            amount: true,
          },
          orderBy: {
            year: 'asc',
          },
        });

      if (totalRecords.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.FILTERS_FINANCES_200_PT,
        data: totalRecords,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.FILTERS_FINANCES_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FILTERS_FINANCES_404_PT,
        });
      }

      this.logger.error(HTTP_MESSAGES.FILTERS_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FILTERS_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
