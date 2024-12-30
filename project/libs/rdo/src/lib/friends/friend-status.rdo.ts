import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FriendStatusRdo {
  @Expose()
  @ApiProperty({
    description: 'Статус дружбы',
    example: false,
  })
  public status: boolean;
}
