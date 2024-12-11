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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtraServiceService } from './extra-service.service';
import { createExtraServiceDTO } from './dto/create-extraService.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { UpdateExtraServiceDTO } from './dto/update-extraService.dto';
import HTTP_MESSAGES from 'src/common/httpMessages';
import * as dayjs from 'dayjs';

@ApiTags('Extra Services')
@Controller('extra-services')
export class ExtraServiceController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly extraService: ExtraServiceService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.EXTRASERVICE_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXTRASERVICE_CREATE_500_PT,
  })
  @Post()
  createExtraService(@Body() serviceData: createExtraServiceDTO) {
    return this.extraService.createExtraService(serviceData);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXTRASERVICES_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXTRASERVICES_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXTRASERVICES_FETCH_500_PT,
  })
  @Get()
  fetchAll() {
    return this.extraService.fetchAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXTRASERVICE_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXTRASERVICE_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXTRASERVICE_FETCH_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'Service ID.',
    required: true,
    example: 2,
  })
  fetchOne(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
    return this.extraService.fetchOne(parsedId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXTRASERVICE_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXTRASERVICE_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXTRASERVICE_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'Service ID.',
    required: true,
    example: 2,
  })
  updateService(
    @Param() { id }: { id: string },
    @Body() updatedData: UpdateExtraServiceDTO,
  ) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
    return this.extraService.updateExtraService(parsedId, updatedData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXTRASERVICE_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXTRASERVICE_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXTRASERVICE_DELETE_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'Service ID.',
    required: true,
    example: 2,
  })
  deleteService(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
    return this.extraService.deleteExtraService(parsedId);
  }
}
