import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class CreateChildDTO {
  @ApiProperty({
    type: 'string',
    description: 'Child name.',
    required: true,
    example: 'Anna',
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
    description: 'Id of the person who represents the child.',
    required: true,
    example: 'df432661-8850-4167-b040-9ccab460023b',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.CAREGIVERID_REQUIRED_PT,
  })
  @IsString({
    message: VALIDATION_MESSAGES.CAREGIVERID_STRING_PT,
  })
  caregiverId: string;
}
