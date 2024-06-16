import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { User } from '@project/validation';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'admin@admin.ru',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'adminnew',
    minLength: User.Password.Min,
    maxLength: User.Password.Max,
  })
  @MinLength(User.Password.Min)
  @MaxLength(User.Password.Max)
  public password!: string;
}
