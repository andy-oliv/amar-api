import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { Event } from 'src/interfaces/Event';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createEvent(
    eventData: Event,
  ): Promise<{ message: string; data: Event }> {
    try {
      const newEvent: Event = await this.prismaService.event.create({
        data: {
          name: eventData.name,
          type: eventData.type,
          location: eventData.location,
          date: eventData.date,
          hour: eventData.hour,
          duration: eventData.duration,
          observations: eventData.observations,
        },
      });

      return { message: HTTP_MESSAGES.EVENT_CREATE_201_PT, data: newEvent };
    } catch (error) {
      this.logger.error(HTTP_MESSAGES.EVENT_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EVENT_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchAll(): Promise<{ message: string; data: Event[] }> {
    try {
      const eventList: Event[] = await this.prismaService.event.findMany();

      if (eventList.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return { message: HTTP_MESSAGES.EVENTS_FETCH_200_PT, data: eventList };
    } catch (error) {
      if (error.status === 404) {
        this.logger.log(HTTP_MESSAGES.EVENTS_FETCH_404);
        throw new NotFoundException({
          message: HTTP_MESSAGES.EVENTS_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EVENTS_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EVENTS_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchOne(id: number): Promise<{ message: string; data: Event }> {
    try {
      const event: Event = await this.prismaService.event.findFirst({
        where: {
          id,
        },
        include: {
          contracts: {
            select: {
              id: true,
              isSigned: true,
              package: true,
              value: true,
              status: true,
              paymentMethod: true,
              paymentDueDate: true,
              observations: true,
            },
          },
        },
      });

      if (!event) {
        throw new NotFoundException('NOT FOUND');
      }

      return { message: HTTP_MESSAGES.EVENT_FETCH_200_PT, data: event };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.EVENT_FETCH_404, {
          error,
        });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EVENT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.EVENT_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EVENT_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updateEvent(
    id: number,
    updatedData: Partial<Event>,
  ): Promise<{ message: string; data: Event }> {
    try {
      const updatedEvent: Event = await this.prismaService.event.update({
        where: {
          id,
        },
        data: updatedData,
      });

      return { message: HTTP_MESSAGES.EVENT_UPDATE_200_PT, data: updatedEvent };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EVENT_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EVENT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }
      this.logger.error(HTTP_MESSAGES.EVENT_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EVENT_UPDATE_500_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteEvent(id: number): Promise<{ message: string }> {
    try {
      await this.prismaService.event.delete({
        where: {
          id,
        },
      });

      return { message: HTTP_MESSAGES.EVENT_DELETE_200_PT };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.EVENT_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.EVENT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }
      this.logger.error(HTTP_MESSAGES.EVENT_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.EVENT_DELETE_500_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
