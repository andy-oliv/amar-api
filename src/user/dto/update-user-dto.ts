import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdateUserDTO {
  @ApiProperty({
    type: 'string',
    description: 'User name',
    required: false,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.NAME_STRING_PT,
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'User email',
    required: false,
    example: 'john.doe@email.com',
  })
  @IsOptional()
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_VALID_PT })
  email?: string;

  @ApiProperty({
    type: 'string',
    description: 'User avatar picture URL',
    required: false,
    example: 'http://google.com/images/ulroa9113I',
  })
  @IsOptional()
  @IsString({
    message: VALIDATION_MESSAGES.PICTUREURL_STRING_PT,
  })
  pictureUrl?: string;
}
