import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class LoginDTO {
  @ApiProperty({
    type: 'string',
    description: 'User valid email.',
    required: true,
    example: 'johndoe@email.com',
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
    description: 'User strong password.',
    required: true,
    example: 'Ppa4$ssw0RD',
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
