import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateClientDTO {
  @ApiProperty({
    type: 'string',
    description: 'Full client name',
    required: false,
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Valid email following the format: janedoe@mail.com',
    required: false,
    example: 'jane.doe@email.com.br',
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: VALIDATION_MESSAGES.EMAIL_VALID_PT,
    },
  )
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Client phone number',
    required: false,
    example: '(51)99999999',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.PHONENUMBER_STRING_PT,
  })
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    description: 'Client address',
    required: false,
    example: 'Maya Street, 1030, Monteiro, Porto Alegre, Brazil',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.ADDRESS_STRING_PT,
  })
  address: string;

  @ApiProperty({
    type: 'string',
    description: 'Client city',
    required: true,
    example: 'Cachoeirinha',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.CITY_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.CITY_STRING_PT,
  })
  city: string;

  @ApiProperty({
    type: 'string',
    description: 'Brazilian social security number',
    required: false,
    example: '01532397088',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.CPF_STRING_PT,
  })
  cpf?: string;

  @ApiProperty({
    type: 'string',
    description: 'Client ID',
    required: false,
    example: '1085719380',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.RG_STRING_PT,
  })
  rg?: string;

  @ApiProperty({
    type: 'string',
    description: 'Client Instagram @',
    required: false,
    example: '@jane_doe',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.INSTAGRAM_STRING_PT,
  })
  instagram?: string;
}