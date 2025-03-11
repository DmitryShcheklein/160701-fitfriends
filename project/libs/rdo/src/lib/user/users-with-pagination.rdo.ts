import { PaginationRdo } from '../pagination.rdo';
import { PaginationResult } from '@project/core';
import { UserRdo } from '@project/rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UsersWithPaginationRdo
  extends PaginationRdo
  implements PaginationResult<UserRdo>
{
  @Expose()
  @ApiProperty({
    description: 'Список пользователей',
    example: UserRdo,
    isArray: true,
    type: UserRdo,
  })
  public entities!: UserRdo[];
}
