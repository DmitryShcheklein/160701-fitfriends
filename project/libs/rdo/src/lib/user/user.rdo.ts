import { ApiProperty } from '@nestjs/swagger';
import { User, UserGender, UserLocation } from '@project/core';
import { Expose, Transform } from 'class-transformer';
import { UserConfigRdo } from './user-config.rdo';

export class UserRdo implements Omit<User, 'email' | 'role'> {
  @Expose()
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
  public firstname!: string;

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
    required: false,
    description: 'User training readines',
    example: true,
  })
  @Expose()
  public trainingReadiness: boolean;

  @ApiProperty({
    required: false,
    description: 'User training config',
  })
  @Expose()
  public trainingConfig?: UserConfigRdo;
}
