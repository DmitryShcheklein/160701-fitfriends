import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/validation';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'admin@admin.ru',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Admin',
    minLength: User.Firstname.Min,
    maxLength: User.Firstname.Max,
  })
  @MinLength(User.Firstname.Min)
  @MaxLength(User.Firstname.Max)
  @IsString()
  public firstname!: string;

  @ApiProperty({
    description: 'User password',
    example: 'adminnew',
    minLength: User.Password.Min,
    maxLength: User.Password.Max,
  })
  @MinLength(User.Password.Min)
  @MaxLength(User.Password.Max)
  @IsString()
  public password!: string;

  public avatarPath?: string;
}

export class CreateUserDtoWithAvatarFile extends CreateUserDto {
  @ApiProperty({
    required: false,
    description: 'User profile picture PNG or JPG file',
    type: 'string',
    format: 'binary',
    enum: ['image/png', 'image/jpeg', 'image/jpg'],
    maxLength: 100,
  })
  public avatar?: Express.Multer.File;
}
