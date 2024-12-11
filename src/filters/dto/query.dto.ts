import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, Length } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class QueryDTO {
  @ApiProperty({
    type: 'string',
    required: false,
    description:
      "Name of one of the packages that are sold: 'NUVEM', 'CÉU', 'SOL', 'LUA', 'COMETA'.",
    example: 'CÉU',
  })
  @IsOptional()
  servicePackage: string;

  @ApiProperty({
    type: 'boolean',
    required: false,
    description:
      'Boolean that indicates if the endpoint should direct to the function that filters by city.',
    example: 'true',
  })
  @IsOptional()
  getByCity: boolean;

  @ApiProperty({
    type: 'string',
    required: false,
    description:
      "Filters by revenue or expenses. Accepts only one of the following options: 'receita', 'despesa'.",
    example: 'receita',
  })
  @IsOptional()
  @IsIn(['receita', 'despesa'], {
    message: VALIDATION_MESSAGES.TYPE_FINANCIALRECORD_ISIN_PT,
  })
  type: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'String representation of a year with 4 digits.',
    example: '2024',
  })
  @IsOptional()
  @IsNumberString(
    {
      no_symbols: true,
    },
    {
      message: VALIDATION_MESSAGES.NUMBER_STRING_PT,
    },
  )
  @Length(4, 4, {
    message: VALIDATION_MESSAGES.YEAR_STRING_LENGTH_PT,
  })
  year: string;
}
