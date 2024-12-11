import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { ExpenseCategory } from 'src/interfaces/ExpenseCategory';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ExpenseCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createExpenseCategory(
    name: string,
  ): Promise<{ message: string; data: ExpenseCategory }> {
    try {
      const newCategory: ExpenseCategory =
        await this.prismaService.expenseCategory.create({
          data: {
            name,
          },
        });

      return {
        message: HTTP_MESSAGES.EXPENSECATEGORY_CREATE_201_PT,
        data: newCategory,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXPENSECATEGORY_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchCategories(): Promise<{
    message: string;
    data: ExpenseCategory[];
  }> {
    try {
      const expenseCategoryList: ExpenseCategory[] =
        await this.prismaService.expenseCategory.findMany();

      if (expenseCategoryList.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_200_PT,
        data: expenseCategoryList,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchCategory(id: number): Promise<{
    message: string;
    data: ExpenseCategory;
  }> {
    try {
      const foundCategory: ExpenseCategory =
        await this.prismaService.expenseCategory.findFirst({
          where: {
            id,
          },
          include: {
            records: {
              select: {
                id: true,
                contractId: true,
                type: true,
                amount: true,
                status: true,
                month: true,
                year: true,
              },
            },
          },
        });

      if (foundCategory === null) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_200_PT,
        data: foundCategory,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404, {
          error,
        });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updateCategory(
    id: number,
    name: string,
  ): Promise<{
    message: string;
    data: ExpenseCategory;
  }> {
    try {
      const updatedCategory: ExpenseCategory =
        await this.prismaService.expenseCategory.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });

      return {
        message: HTTP_MESSAGES.EXPENSECATEGORY_UPDATE_200_PT,
        data: updatedCategory,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXPENSECATEGORY_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteCategory(id: number): Promise<{
    message: string;
  }> {
    try {
      await this.prismaService.expenseCategory.delete({
        where: {
          id,
        },
      });

      return { message: HTTP_MESSAGES.EXPENSECATEGORY_DELETE_200_PT };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404, {
          error,
        });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EXPENSECATEGORY_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EXPENSECATEGORY_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
