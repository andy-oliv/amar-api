import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateChildDTO {
  @ApiProperty({
    type: 'string',
    description: 'Child name.',
    required: false,
    example: 'Anna',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name: string;
}
