import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateEventDTO {
  @ApiProperty({
    type: 'string',
    description: 'Event name.',
    required: false,
    example: 'Aniversário de 3 anos - Sofia',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'It has to be either "ENSAIO" or "EVENTO".',
    required: false,
    example: 'EVENTO',
  })
  @IsOptional()
  @IsIn(['ENSAIO', 'EVENTO'], {
    message: VALIDATION_MESSAGES.TYPE_ISIN_PT,
  })
  type: string;

  @ApiProperty({
    type: 'string',
    description: 'Event location.',
    required: false,
    example: 'Av. das Hortências, 203, Porto Alegre/RS',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.LOCATION_STRING_PT,
  })
  location: string;

  @ApiProperty({
    type: 'string',
    description: 'Event date.',
    required: false,
    example: '21/12/2024',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.DATE_STRING_PT,
  })
  date: string;

  @ApiProperty({
    type: 'string',
    description: 'Event hour.',
    required: false,
    example: '14:00',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.HOUR_STRING_PT,
  })
  hour: string;

  @ApiProperty({
    type: 'number',
    description: 'The duration of the event in hours.',
    required: false,
    example: 3,
  })
  @IsOptional()
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
