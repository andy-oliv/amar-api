import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { Child } from 'src/interfaces/Child';
import { Client } from 'src/interfaces/Client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ChildService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createChild(
    childData: Child,
  ): Promise<{ message: string; data: Child }> {
    const client: Client = await this.prismaService.client.findFirst({
      where: {
        id: childData.caregiverId,
      },
    });

    if (!client) {
      this.logger.error(HTTP_MESSAGES.CHILD_CLIENT_404, { client });
      throw new NotFoundException({
        message: HTTP_MESSAGES.CHILD_CLIENT_404_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    try {
      const newChild: Child = await this.prismaService.child.create({
        data: childData,
      });

      return { message: HTTP_MESSAGES.CHILD_CREATE_201_PT, data: newChild };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.CHILD_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CHILD_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async findChildren(): Promise<{ message: string; data: Child[] }> {
    try {
      const childrenList: Child[] = await this.prismaService.child.findMany();

      if (childrenList.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.CHILDREN_FETCH_200_PT,
        data: childrenList,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.CHILDREN_FETCH_404, { error });
        throw new InternalServerErrorException({
          message: HTTP_MESSAGES.CHILDREN_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CHILDREN_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CHILDREN_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async findChild(childId: number): Promise<{ message: string; data: Child }> {
    try {
      const foundChild: Child = await this.prismaService.child.findFirst({
        where: {
          id: childId,
        },
        include: {
          caregiver: true,
        },
      });

      if (!foundChild) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.CHILD_FETCH_200_PT,
        data: foundChild,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.CHILD_FETCH_404, {
          error,
        });
        throw new NotFoundException({
          message: HTTP_MESSAGES.CHILD_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CHILD_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CHILD_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updateChild(
    id: number,
    updatedName: string,
  ): Promise<{ message: string; data: Child }> {
    try {
      const foundChild: Child = await this.prismaService.child.findFirst({
        where: {
          id: id,
        },
      });

      if (!foundChild) {
        throw new NotFoundException('NOT FOUND');
      }

      const updatedChild: Child = await this.prismaService.child.update({
        where: {
          id,
        },
        data: {
          name: updatedName,
        },
      });

      return {
        message: HTTP_MESSAGES.CHILD_UPDATE_200_PT,
        data: updatedChild,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.CHILD_FETCH_404, {
          error,
        });

        throw new NotFoundException({
          message: HTTP_MESSAGES.CHILD_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CHILD_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CHILD_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteChild(id: number): Promise<{ message: string }> {
    try {
      const foundChild: Child = await this.prismaService.child.findFirst({
        where: {
          id: id,
        },
      });

      if (!foundChild) {
        throw new NotFoundException('NOT FOUND');
      }

      await this.prismaService.child.delete({
        where: {
          id,
        },
      });

      return {
        message: HTTP_MESSAGES.CHILD_DELETE_200_PT,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.CHILD_FETCH_404, {
          error,
        });

        throw new NotFoundException({
          message: HTTP_MESSAGES.CHILD_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CHILD_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CHILD_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
