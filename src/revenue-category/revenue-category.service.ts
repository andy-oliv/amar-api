import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { RevenueCategory } from 'src/interfaces/RevenueCategory';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class RevenueCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createExpenseCategory(
    name: string,
  ): Promise<{ message: string; data: RevenueCategory }> {
    try {
      const newCategory: RevenueCategory =
        await this.prismaService.revenueCategory.create({
          data: {
            name,
          },
        });

      return {
        message: HTTP_MESSAGES.REVENUECATEGORY_CREATE_201_PT,
        data: newCategory,
      };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.REVENUECATEGORY_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchCategories(): Promise<{
    message: string;
    data: RevenueCategory[];
  }> {
    try {
      const revenueCategoryList: RevenueCategory[] =
        await this.prismaService.revenueCategory.findMany();

      if (revenueCategoryList.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.REVENUECATEGORIES_FETCH_200_PT,
        data: revenueCategoryList,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.REVENUECATEGORIES_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.REVENUECATEGORIES_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.REVENUECATEGORIES_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.REVENUECATEGORIES_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchCategory(id: number): Promise<{
    message: string;
    data: RevenueCategory;
  }> {
    try {
      const foundCategory: RevenueCategory =
        await this.prismaService.revenueCategory.findFirst({
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
        message: HTTP_MESSAGES.REVENUECATEGORY_FETCH_200_PT,
        data: foundCategory,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_FETCH_404, {
          error,
        });
        throw new NotFoundException({
          message: HTTP_MESSAGES.REVENUECATEGORY_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.REVENUECATEGORY_FETCH_500_PT,
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
    data: RevenueCategory;
  }> {
    try {
      const updatedCategory: RevenueCategory =
        await this.prismaService.revenueCategory.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });

      return {
        message: HTTP_MESSAGES.REVENUECATEGORY_UPDATE_200_PT,
        data: updatedCategory,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.REVENUECATEGORY_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.REVENUECATEGORY_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteCategory(id: number): Promise<{
    message: string;
  }> {
    try {
      await this.prismaService.revenueCategory.delete({
        where: {
          id,
        },
      });

      return { message: HTTP_MESSAGES.REVENUECATEGORY_DELETE_200_PT };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_FETCH_404, {
          error,
        });
        throw new NotFoundException({
          message: HTTP_MESSAGES.REVENUECATEGORY_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.REVENUECATEGORY_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.REVENUECATEGORY_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
