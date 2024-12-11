import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class CreateUserDTO {
  @ApiProperty({
    type: 'string',
    description: 'User full name',
    required: true,
    example: 'John Doe',
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
    description: 'Valid email',
    required: true,
    example: 'johndoe@mail.com',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.EMAIL_REQUIRED_PT,
  })
  @IsEmail(
    {},
    {
      message: VALIDATION_MESSAGES.EMAIL_VALID_PT,
    },
  )
  email: string;

  @ApiProperty({
    type: 'string',
    description:
      'Strong password with at least 8 characters (1 lowercase letter, 1 uppercase letter, 1 number, 1 symbol)',
    required: true,
    example: 'P4ssw$rd',
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.PASSWORD_REQUIRED_PT,
  })
  @IsStrongPassword(
    {
      minLength: 8,
    },
    {
      message: VALIDATION_MESSAGES.PASSWORD_STRONG_PT,
    },
  )
  password: string;
}
