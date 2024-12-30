import { Friend } from '@project/core';
import { UserRdo } from '../user/user.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FriendRdo implements Omit<Friend, 'friendId' | 'userId'> {
  @Expose()
  @ApiProperty({
    description: 'Уникальный идентификатор',
    example: 'df1912151f3c407d96b2390bdfae1961',
  })
  public id!: string;

  @Expose({ name: 'friendId' })
  @ApiProperty({
    description: 'Тренер, создавшего тренировку',
  })
  public friend!: UserRdo;
}
