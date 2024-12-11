import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateExtraServiceDTO {
  @ApiProperty({
    type: 'string',
    description: 'Extra service name.',
    required: false,
    example: 'Extra hour',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;

  @ApiProperty({
    type: 'number',
    description: 'Price of the service.',
    required: false,
    example: 1200,
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.VALUE_NUMBER_PT,
    },
  )
  price: number;

  @ApiProperty({
    type: 'string',
    description: 'Contract UUID.',
    required: false,
    example: 'f3428b82-1c91-40b4-99b0-ce44a349360b',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.ID_STRING_PT,
  })
  contractId: string;
}
