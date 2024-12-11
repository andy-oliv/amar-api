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
import { ChildService } from './child.service';
import { Logger } from 'nestjs-pino';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChildDTO } from './dto/createChild.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { UpdateChildDTO } from './dto/update-child.dto';
import * as dayjs from 'dayjs';

@ApiTags('Child')
@Controller('children')
export class ChildController {
  constructor(
    private readonly childService: ChildService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CHILD_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CHILD_CLIENT_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CHILD_CREATE_500_PT,
  })
  @Post()
  createChild(@Body() childData: CreateChildDTO) {
    return this.childService.createChild(childData);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CHILDREN_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CHILD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CHILD_FETCH_500_PT,
  })
  @Get()
  findChildren() {
    return this.childService.findChildren();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CHILD_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CHILD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CHILD_FETCH_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Child id.',
    required: true,
    example: '1',
  })
  @Get(':id')
  findChild(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.childService.findChild(parsedId);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CHILD_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CHILD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CHILD_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Child id.',
    required: true,
    example: '4',
  })
  @Patch(':id')
  updateChild(
    @Param() { id }: { id: string },
    @Body() { name }: UpdateChildDTO,
  ) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.childService.updateChild(parsedId, name);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CHILD_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CHILD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CHILD_DELETE_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Child id.',
    required: true,
    example: '4',
  })
  @Delete(':id')
  deleteChild(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.childService.deleteChild(parsedId);
  }
}
