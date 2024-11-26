import { IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQuery } from './base.query';

import { SortBy } from '@project/enums';
import { DefaultSort } from '../const/main.const';

export class OrdersTrainerQuery extends BaseQuery {
  @ApiProperty({
    description: 'The sort type for orders',
    default: DefaultSort.BY,
    enum: SortBy,
    required: false,
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy?: SortBy = DefaultSort.BY;
}
