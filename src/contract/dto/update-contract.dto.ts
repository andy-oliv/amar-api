import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateContractDTO {
  @ApiProperty({
    type: 'string',
    description: 'URL where the contract is located.',
    required: false,
    example: 'http://google.drive.com/1310dk0kf10101k3',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.CONTRACTURL_STRING_PT,
  })
  contractUrl?: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Boolean to check if the contract is signed.',
    required: false,
    example: 'true',
  })
  @IsOptional()
  @IsBoolean({
    message: VALIDATION_MESSAGES.ISSIGNED_BOOLEAN_PT,
  })
  isSigned?: boolean;

  @ApiProperty({
    type: 'string',
    description: 'UUID that represents the client.',
    required: false,
    example: 'f3428b82-1c91-40b4-99b0-ce44a349360b',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.ID_STRING_PT,
  })
  clientId?: string;

  @ApiProperty({
    type: 'number',
    description: 'Event ID.',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.EVENTID_NUMBER_PT,
    },
  )
  eventId?: number;

  @ApiProperty({
    type: 'string',
    description: 'One of the packages that Amar Infâncias sells.',
    required: false,
    example: 'NUVEM',
  })
  @IsOptional()
  @IsIn(['NUVEM', 'CÉU', 'SOL', 'LUA', 'COMETA', 'ESPECIAL'], {
    message: VALIDATION_MESSAGES.PACKAGE_ISIN_PT,
  })
  package?: string;

  @ApiProperty({
    type: 'number',
    description: 'price of the photographic service.',
    required: false,
    example: '500',
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.VALUE_NUMBER_PT,
    },
  )
  value?: number;

  @ApiProperty({
    type: 'string',
    description:
      'One of the following status: PENDENTE, PAGO, CANCELADO, PARCIAL.',
    required: false,
    example: 'PENDENTE',
  })
  @IsOptional()
  @IsIn(['PENDENTE', 'PAGO', 'CANCELADO', 'PARCIAL'], {
    message: VALIDATION_MESSAGES.STATUS_ISIN_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.STATUS_STRING_PT,
  })
  status?: string;

  @ApiProperty({
    type: 'string',
    description: 'contract generation date.',
    required: true,
    example: '12/12/2024',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.DATE_STRING_PT,
  })
  date: string;

  @ApiProperty({
    type: 'string',
    description: 'One of the following payment methods: CARTÃO, PIX.',
    required: false,
    example: 'PIX',
  })
  @IsOptional()
  @IsIn(['CARTÃO', 'PIX'], {
    message: VALIDATION_MESSAGES.PAYMENTMETHOD_ISIN_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.PAYMENTMETHOD_STRING_PT,
  })
  paymentMethod?: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Check if the payment is going to be divided.',
    required: false,
    example: 'false',
  })
  @IsOptional()
  @IsBoolean({
    message: VALIDATION_MESSAGES.SPLITPAYMENT_BOOLEAN_PT,
  })
  splitPayment?: boolean;

  @ApiProperty({
    type: 'string',
    description: 'Due date.',
    required: false,
    example: '16/12/2024',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.PAYMENTDUEDATE_STRING_PT,
  })
  paymentDueDate?: string;

  @ApiProperty({
    type: 'string',
    description: 'Attribute to take note of any observations.',
    required: false,
    example: 'A cliente solicitou reembolso.',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.OBSERVATIONS_STRING_PT,
  })
  observations?: string;
}
