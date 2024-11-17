import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/core';
import { Expose, Transform } from 'class-transformer';
import { UserConfigRdo } from './user-config.rdo';
import { UserGender, UserLocation } from '@project/enums';

export class UserRdo implements Omit<User, 'role'> {
  @Expose({ name: '_id' })
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  public email!: string;

  @Expose()
  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public firstName!: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'User create date',
    example: '2024-01-09T14:55:34.697Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'User avatar path',
    example: 'http://localhost:3333/static/avatar.png',
  })
  @Transform(({ value }) => (value === undefined ? null : value))
  public avatarPath!: string | null;

  @Expose()
  @ApiProperty({
    description: 'User background path',
    example: 'http://localhost:3333/static/bg.png',
  })
  @Transform(({ value }) => (value === undefined ? null : value))
  public backgroundPath?: string | null;

  @ApiProperty({
    required: false,
    description: 'User description',
    example: 'Lorem ipsum',
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    required: false,
    description: 'User birth date',
    example: '2024-01-11T14:19:59.298Z',
  })
  @Expose()
  public dateOfBirth: Date;

  @ApiProperty({
    description: 'User gender',
    example: UserGender.Male,
    enum: UserGender,
  })
  @Expose()
  public gender: UserGender;

  @ApiProperty({
    description: 'User location',
    example: UserLocation.Petrogradskaya,
    enum: UserLocation,
  })
  @Expose()
  public location: UserLocation;

  @ApiProperty({
    type: UserConfigRdo,
    required: false,
    description: 'User training config',
  })
  @Expose()
  public trainingConfig?: UserConfigRdo;
}
