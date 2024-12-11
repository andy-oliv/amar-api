import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { FinancialRecord } from 'src/interfaces/FinancialRecord';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate as uuidValidate } from 'uuid';
import * as dayjs from 'dayjs';
@Injectable()
export class FinancialRecordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createFinancialRecord(
    recordData: FinancialRecord,
  ): Promise<{ message: string; data: FinancialRecord }> {
    try {
      const newRecord: FinancialRecord =
        await this.prismaService.financialRecord.create({
          data: recordData,
        });
      return {
        message: HTTP_MESSAGES.FINANCIALRECORD_CREATE_201_PT,
        data: newRecord,
      };
    } catch (error) {
      this.logger.log(error);
      this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FINANCIALRECORD_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchFinancialRecords(): Promise<{
    message: string;
    data: FinancialRecord[];
  }> {
    try {
      const financialRecords: FinancialRecord[] =
        await this.prismaService.financialRecord.findMany();

      if (financialRecords.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.FINANCIALRECORDS_FETCH_200_PT,
        data: financialRecords,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.FINANCIALRECORDS_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FINANCIALRECORDS_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.FINANCIALRECORDS_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FINANCIALRECORDS_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchFinancialRecord(id: string): Promise<{
    message: string;
    data: FinancialRecord;
  }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      const foundRecord: FinancialRecord =
        await this.prismaService.financialRecord.findFirst({
          where: {
            id,
          },
          include: {
            contract: {
              select: {
                id: true,
                client: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
                contractUrl: true,
              },
            },
            expenseCategory: {
              select: {
                name: true,
              },
            },
            revenueCategory: {
              select: {
                name: true,
              },
            },
          },
        });

      if (foundRecord === null) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.FINANCIALRECORD_FETCH_200_PT,
        data: foundRecord,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FINANCIALRECORD_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FINANCIALRECORD_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updateFinancialRecord(
    id: string,
    updatedData: Partial<FinancialRecord>,
  ): Promise<{
    message: string;
    data: FinancialRecord;
  }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      const updatedRecord: FinancialRecord =
        await this.prismaService.financialRecord.update({
          where: {
            id,
          },
          data: {
            contractId: updatedData.contractId,
            expenseCategoryId: updatedData.expenseCategoryId,
            revenueCategoryId: updatedData.revenueCategoryId,
            amount: updatedData.amount,
            type: updatedData.type,
            month: updatedData.month,
            year: updatedData.year,
            status: updatedData.status,
            paymentMethod: updatedData.paymentMethod,
          },
        });

      return {
        message: HTTP_MESSAGES.FINANCIALRECORD_UPDATE_200_PT,
        data: updatedRecord,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FINANCIALRECORD_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FINANCIALRECORD_UPDATE_500,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteFinancialRecord(id: string): Promise<{
    message: string;
  }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      await this.prismaService.financialRecord.delete({
        where: {
          id,
        },
      });

      return { message: HTTP_MESSAGES.FINANCIALRECORD_DELETE_200_PT };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.FINANCIALRECORD_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.FINANCIALRECORD_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.FINANCIALRECORD_DELETE_500_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
