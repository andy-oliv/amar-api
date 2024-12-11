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
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDTO } from './dto/create-expenseCategory.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import HTTP_MESSAGES from 'src/common/httpMessages';
import * as dayjs from 'dayjs';

@ApiTags('Expense category')
@Controller('expense-categories')
export class ExpenseCategoryController {
  constructor(
    private readonly logger: Logger,
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.EXPENSECATEGORY_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXPENSECATEGORY_CREATE_500_PT,
  })
  @Post()
  createExpenseCategory(@Body() { name }: CreateExpenseCategoryDTO) {
    return this.expenseCategoryService.createExpenseCategory(name);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXPENSECATEGORIES_FETCH_500_PT,
  })
  fetchCategories() {
    return this.expenseCategoryService.fetchCategories();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_500_PT,
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

    return this.expenseCategoryService.fetchCategory(parsedId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXPENSECATEGORY_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXPENSECATEGORY_UPDATE_500_PT,
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

    return this.expenseCategoryService.updateCategory(parsedId, name);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.EXPENSECATEGORY_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.EXPENSECATEGORY_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.EXPENSECATEGORY_DELETE_500_PT,
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

    return this.expenseCategoryService.deleteCategory(parsedId);
  }
}
