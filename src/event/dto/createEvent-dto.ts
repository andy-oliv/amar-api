import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class CreateEventDTO {
  @ApiProperty({
    type: 'string',
    description: 'Event name.',
    required: true,
    example: 'Aniversário de 3 anos - Sofia',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.NAME_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'It has to be either "ENSAIO" or "EVENTO".',
    required: true,
    example: 'EVENTO',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.TYPE_REQUIRED_PT,
  })
  @IsIn(['ENSAIO', 'EVENTO'], {
    message: VALIDATION_MESSAGES.TYPE_ISIN_PT,
  })
  type: string;

  @ApiProperty({
    type: 'string',
    description: 'Event location.',
    required: true,
    example: 'Av. das Hortências, 203, Porto Alegre/RS',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.LOCATION_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.LOCATION_STRING_PT,
  })
  location: string;

  @ApiProperty({
    type: 'string',
    description: 'Event date.',
    required: true,
    example: '20/12/2024',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.DATE_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.DATE_STRING_PT,
  })
  date: string;

  @ApiProperty({
    type: 'string',
    description: 'Event hour.',
    required: true,
    example: '13:00',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.HOUR_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.HOUR_STRING_PT,
  })
  hour: string;

  @ApiProperty({
    type: 'number',
    description: 'The duration of the event in hours.',
    required: true,
    example: 3,
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.DURATION_REQUIRED_PT,
  })
  @IsNumber(
    {},
    {
      message: VALIDATION_MESSAGES.DURATION_NUMBER_PT,
    },
  )
  duration: number;

  @ApiProperty({
    type: 'string',
    description: 'Any details that need to be remembered.',
    required: false,
    example: 'A mãe deseja fotos posadas com os avós.',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.OBSERVATIONS_STRING_PT,
  })
  observations: string;
}
