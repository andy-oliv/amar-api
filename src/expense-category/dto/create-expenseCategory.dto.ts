import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class CreateExpenseCategoryDTO {
  @ApiProperty({
    type: 'string',
    description: 'Expense category name.',
    required: true,
    example: 'Cobertura em vídeo',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.NAME_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;
}
