import { PaginationResult } from '@project/core';
import { PaginationRdo } from '../pagination.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderTrainerRdo } from './order-trainer.rdo';

export class OrdersWithPaginationTrainerRdo
  extends PaginationRdo
  implements PaginationResult<OrderTrainerRdo>
{
  @Expose()
  @ApiProperty({
    description: 'Список заказов тренера',
    example: OrderTrainerRdo,
    isArray: true,
    type: OrderTrainerRdo,
  })
  public entities!: OrderTrainerRdo[];
}
