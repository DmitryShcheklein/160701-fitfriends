import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/core';
import { UserGender, UserLocation, UserRole } from '@project/enums';
import { User as UserValidation } from '@project/validation';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto implements Omit<User, 'avatarPath'> {
  @ApiProperty({
    description: 'User unique email address',
    example: 'admin@admin.ru',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Admin',
    minLength: UserValidation.Firstname.Min,
    maxLength: UserValidation.Firstname.Max,
  })
  @MinLength(UserValidation.Firstname.Min)
  @MaxLength(UserValidation.Firstname.Max)
  @IsString()
  public firstname!: string;

  @ApiProperty({
    description: 'User password',
    example: 'adminnew',
    minLength: UserValidation.Password.Min,
    maxLength: UserValidation.Password.Max,
  })
  @MinLength(UserValidation.Password.Min)
  @MaxLength(UserValidation.Password.Max)
  @IsString()
  public password!: string;

  @ApiProperty({
    required: false,
    description: 'User description',
    example: 'Lorem ipsum',
    minLength: UserValidation.Description.Min,
    maxLength: UserValidation.Description.Max,
  })
  @MinLength(UserValidation.Description.Min)
  @MaxLength(UserValidation.Description.Max)
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    required: false,
    description: 'User birth date',
    example: '2024-01-11T14:19:59.298Z',
  })
  @IsISO8601()
  @IsOptional()
  public dateOfBirth?: Date;

  @ApiProperty({
    description: 'User gender',
    example: UserGender.Male,
    enum: UserGender,
  })
  @IsEnum(UserGender)
  @IsNotEmpty()
  public gender: UserGender;

  @ApiProperty({
    description: 'User location',
    example: UserLocation.Petrogradskaya,
    enum: UserLocation,
  })
  @IsEnum(UserLocation)
  @IsNotEmpty()
  public location: UserLocation;

  @ApiProperty({
    description: 'User role',
    example: UserRole.User,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  public role: UserRole;
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
