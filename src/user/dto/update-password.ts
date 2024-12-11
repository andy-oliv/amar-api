import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class UpdatePasswordDTO {
  @ApiProperty({
    type: 'string',
    description: 'New strong password',
    required: true,
    example: 'E0mnd83%*lk',
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
