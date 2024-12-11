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
import { Logger } from 'nestjs-pino';
import { RevenueCategoryService } from './revenue-category.service';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { CreateExpenseCategoryDTO } from 'src/expense-category/dto/create-expenseCategory.dto';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import * as dayjs from 'dayjs';

@Controller('revenue-categories')
export class RevenueCategoryController {
  constructor(
    private readonly logger: Logger,
    private readonly revenueCategoryService: RevenueCategoryService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.REVENUECATEGORY_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.REVENUECATEGORY_CREATE_500_PT,
  })
  @Post()
  createExpenseCategory(@Body() { name }: CreateExpenseCategoryDTO) {
    return this.revenueCategoryService.createExpenseCategory(name);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.REVENUECATEGORIES_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.REVENUECATEGORIES_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.REVENUECATEGORIES_FETCH_500_PT,
  })
  fetchCategories() {
    return this.revenueCategoryService.fetchCategories();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.REVENUECATEGORY_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.REVENUECATEGORY_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.REVENUECATEGORY_FETCH_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID.',
    required: true,
    example: '2',
  })
  fetchCategory(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID_PT);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.revenueCategoryService.fetchCategory(parsedId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.REVENUECATEGORY_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.REVENUECATEGORY_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.REVENUECATEGORY_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID.',
    required: true,
    example: '2',
  })
  updateCategory(
    @Param() { id }: { id: string },
    @Body() { name }: CreateExpenseCategoryDTO,
  ) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID_PT);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.revenueCategoryService.updateCategory(parsedId, name);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.REVENUECATEGORY_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.REVENUECATEGORY_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.REVENUECATEGORY_DELETE_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID.',
    required: true,
    example: '2',
  })
  deletecategory(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID_PT);
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.revenueCategoryService.deleteCategory(parsedId);
  }
}
