import { PaginationResult } from '@project/core';
import { PaginationRdo } from '../pagination.rdo';
import { OrderRdo } from './order.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrdersWithPaginationTrainerRdo
  extends PaginationRdo
  implements PaginationResult<OrderRdo>
{
  @Expose()
  @ApiProperty({
    description: 'Список заказов',
    example: OrderRdo,
    isArray: true,
    type: OrderRdo,
  })
  public entities!: OrderRdo[];
}
