import { ApiProperty } from '@nestjs/swagger';
import { User, UserGender, UserLocation } from '@project/core';
import { User as UserValidation } from '@project/validation';
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto
  implements Partial<Omit<User, 'avatarPath' | 'email' | 'password' | 'role'>>
{
  @ApiProperty({
    required: false,
    description: 'User first name',
    example: 'Admin',
    minLength: UserValidation.Firstname.Min,
    maxLength: UserValidation.Firstname.Max,
  })
  @MinLength(UserValidation.Firstname.Min)
  @MaxLength(UserValidation.Firstname.Max)
  @IsString()
  @IsOptional()
  public firstname?: string;

  @ApiProperty({
    required: false,
    description: 'User description',

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
    description: 'User gender',
    enum: UserGender,
  })
  @IsEnum(UserGender)
  @IsOptional()
  public gender?: UserGender;

  @ApiProperty({
    required: false,
    description: 'User birth date',
  })
  @IsISO8601()
  @IsOptional()
  public dateOfBirth?: Date;

  @ApiProperty({
    required: false,
    description: 'User location',

    enum: UserLocation,
  })
  @IsEnum(UserLocation)
  @IsOptional()
  public location?: UserLocation;

  @ApiProperty({
    required: false,
    description: 'User profile picture PNG or JPG file',
    type: 'string',
    format: 'binary',
    enum: ['image/png', 'image/jpeg', 'image/jpg'],
    maxLength: 100,
  })
  @IsOptional()
  public avatar?: Express.Multer.File | null | string;
}
