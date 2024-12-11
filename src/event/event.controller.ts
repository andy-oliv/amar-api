import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateEventDTO } from './dto/createEvent-dto';
import { EventService } from './event.service';
import { Logger } from 'nestjs-pino';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UpdateEventDTO } from './dto/updateEvent-dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import HTTP_MESSAGES from 'src/common/httpMessages';
import * as dayjs from 'dayjs';

@ApiTags('Event')
@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EVENT_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EVENT_CREATE_500_PT,
  })
  @Post()
  createEvent(@Body() event: CreateEventDTO) {
    return this.eventService.createEvent(event);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EVENTS_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EVENTS_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EVENTS_FETCH_500_PT,
  })
  @Get()
  fetchAll() {
    return this.eventService.fetchAll();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EVENT_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EVENT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EVENT_FETCH_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Event id.',
    required: true,
    example: 4,
  })
  @Get(':id')
  fetchOne(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.eventService.fetchOne(parsedId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EVENT_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EVENT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EVENT_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Event id.',
    required: true,
    example: 4,
  })
  updateEvent(
    @Param() { id }: { id: string },
    @Body() updatedData: UpdateEventDTO,
  ) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.eventService.updateEvent(parsedId, updatedData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EVENT_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EVENT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EVENT_DELETE_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Event id.',
    required: true,
    example: 4,
  })
  deleteEvent(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.eventService.deleteEvent(parsedId);
  }
}
