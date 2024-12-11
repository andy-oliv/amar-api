import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateFinancialRecordDTO {
  @ApiProperty({
    type: 'string',
    description:
      "Type of financial transaction. It has to be one of the following: 'RECEITA', 'DESPESA'.",
    required: true,
    example: 'PAGAMENTO',
  })
  @IsOptional()
  @IsIn(['RECEITA', 'DESPESA'], {
    message: VALIDATION_MESSAGES.TYPE_FINANCIALRECORD_ISIN_PT,
  })
  type: string;

  @ApiProperty({
    type: 'string',
    description: 'Contract UUID.',
    required: true,
    example: '8b782612-2527-4be7-b827-64484c7c03f1',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.ID_STRING_PT,
  })
  contractId?: string;

  @ApiProperty({
    type: 'number',
    description: 'Expense category ID.',
    required: false,
    example: 2,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.ID_NUMBER_PT,
    },
  )
  expenseCategory?: number;

  @ApiProperty({
    type: 'number',
    description: 'Expense category ID.',
    required: false,
    example: 3,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.ID_NUMBER_PT,
    },
  )
  revenueCategory?: number;

  @ApiProperty({
    type: 'number',
    description: 'Transaction value.',
    required: true,
    example: 500,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.VALUE_NUMBER_PT,
    },
  )
  amount: number;

  @ApiProperty({
    type: 'number',
    description: 'Transaction month.',
    required: true,
    example: 5,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.MONTH_NUMBER_PT,
    },
  )
  month: number;

  @ApiProperty({
    type: 'number',
    description: 'Transaction year.',
    required: true,
    example: 2024,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.YEAR_NUMBER_PT,
    },
  )
  year: number;

  @ApiProperty({
    type: 'string',
    description:
      "Financial record status. Is has to be one of the following: 'PENDENTE', 'PAGO', 'CANCELADO', 'PARCIAL'.",
    required: true,
    example: 'PENDENTE',
  })
  @IsOptional()
  @IsIn(['PENDENTE', 'PAGO', 'CANCELADO', 'PARCIAL'], {
    message: VALIDATION_MESSAGES.STATUS_ISIN_PT,
  })
  status: string;

  @ApiProperty({
    type: 'string',
    description:
      "Payment method. It has to be one of the following: 'CARTÃO', 'PIX'.",
    required: true,
    example: 'PIX',
  })
  @IsOptional()
  @IsIn(['CARTÃO', 'PIX'], {
    message: VALIDATION_MESSAGES.PAYMENTMETHOD_ISIN_PT,
  })
  paymentMethod?: string;
}
