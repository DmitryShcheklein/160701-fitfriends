import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class RegisteredUserRdo extends UserRdo {
  @Expose()
  @ApiProperty({
    description: 'Token',
    example:
      'eyJlbWFpbCI6IjFAMS5ydSIsImlkIjoiNjQ5ZThiYzc5OWU1ZGI3YjVhNmY2ZmI0IiwiaWF0IjoxNjg4MTEyMzgwLCJleHAiOjE2ODgyODUxODB9',
  })
  public accessToken!: string;

  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJlbWFpbCI6IjFAMS5ydSIsImlkIjoiNjQ5ZThiYzc5OWU1ZGI3YjVhNmY2ZmI0IiwiaWF0IjoxNjg4MTEyMzgwLCJleHAiOjE2ODgyODUxODB9',
  })
  @Expose()
  public refreshToken!: string;
}
