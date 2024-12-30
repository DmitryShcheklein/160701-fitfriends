import { PaginationResult } from '@project/core';
import { PaginationRdo } from '../pagination.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FriendRdo } from './friend.rdo';

export class FriendsWithPaginationRdo
  extends PaginationRdo
  implements PaginationResult<FriendRdo>
{
  @Expose()
  @ApiProperty({
    description: 'Список друзей',
    example: FriendRdo,
    isArray: true,
    type: FriendRdo,
  })
  public entities!: FriendRdo[];
}
