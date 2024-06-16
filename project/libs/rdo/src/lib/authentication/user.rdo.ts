import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/core';
import { Expose, Transform } from 'class-transformer';

export class UserRdo implements User {
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
}
