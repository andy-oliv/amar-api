import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class createExtraServiceDTO {
  @ApiProperty({
    type: 'string',
    description: 'Extra service name.',
    required: true,
    example: 'Extra hour',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.NAME_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;

  @ApiProperty({
    type: 'number',
    description: 'Price of the service.',
    required: true,
    example: 1200,
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.VALUE_REQUIRED_PT,
  })
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
    required: true,
    example: 'f3428b82-1c91-40b4-99b0-ce44a349360b',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.ID_STRING_PT,
  })
  contractId: string;
}
