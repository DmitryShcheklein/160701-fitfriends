import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserValidation } from '@project/validation';
import { TrainerUser } from '@project/core';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: TrainerUser.email,
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: TrainerUser.password,
    minLength: UserValidation.Password.Min,
    maxLength: UserValidation.Password.Max,
  })
  @MinLength(UserValidation.Password.Min)
  @MaxLength(UserValidation.Password.Max)
  public password!: string;
}
