import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserValidation } from '@project/validation';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: '',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '',
    minLength: UserValidation.Password.Min,
    maxLength: UserValidation.Password.Max,
  })
  @MinLength(UserValidation.Password.Min)
  @MaxLength(UserValidation.Password.Max)
  public password!: string;
}
