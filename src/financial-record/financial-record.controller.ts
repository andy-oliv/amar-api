import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFinancialRecordDTO } from './dto/create-financialRecord.dto';
import { FinancialRecordService } from './financial-record.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFinancialRecordDTO } from './dto/update-financialRecord.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import HTTP_MESSAGES from 'src/common/httpMessages';

@ApiTags('Financial Record')
@Controller('financial-records')
export class FinancialRecordController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly financialRecordService: FinancialRecordService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.FINANCIALRECORD_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FINANCIALRECORD_CREATE_500_PT,
  })
  @Post()
  createFinancialRecord(@Body() data: CreateFinancialRecordDTO) {
    data.month = data.month - 1;
    return this.financialRecordService.createFinancialRecord(data);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.FINANCIALRECORDS_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.FINANCIALRECORDS_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FINANCIALRECORDS_FETCH_500_PT,
  })
  @Get()
  fetchFinancialRecords() {
    return this.financialRecordService.fetchFinancialRecords();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.FINANCIALRECORD_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.FINANCIALRECORD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FINANCIALRECORD_FETCH_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '8b782612-2527-4be7-b827-64484c7c03f1',
    description: 'Financial record ID.',
  })
  @Get(':id')
  fetchFinancialRecord(@Param() { id }: { id: string }) {
    return this.financialRecordService.fetchFinancialRecord(id);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.FINANCIALRECORD_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.FINANCIALRECORD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FINANCIALRECORD_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '8b782612-2527-4be7-b827-64484c7c03f1',
    description: 'Financial record ID.',
  })
  @Patch(':id')
  updateFinancialRecord(
    @Param() { id }: { id: string },
    @Body() updatedData: UpdateFinancialRecordDTO,
  ) {
    updatedData.month = updatedData.month - 1;
    return this.financialRecordService.updateFinancialRecord(id, updatedData);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.FINANCIALRECORD_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.FINANCIALRECORD_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FINANCIALRECORD_DELETE_500_PT,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '8b782612-2527-4be7-b827-64484c7c03f1',
    description: 'Financial record ID.',
  })
  @Delete(':id')
  deleteFinancialRecord(@Param() { id }: { id: string }) {
    return this.financialRecordService.deleteFinancialRecord(id);
  }
}
