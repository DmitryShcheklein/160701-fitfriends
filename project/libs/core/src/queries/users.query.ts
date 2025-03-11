import { BaseQuery } from '../queries';
import { DefaultSort } from '../const';
import { ApiProperty } from '@nestjs/swagger';
import { SortBy } from '@project/enums';
import { IsIn, IsOptional } from 'class-validator';

export class UsersQuery extends BaseQuery {
  @ApiProperty({
    description: 'The sort type the products',
    default: DefaultSort.BY,
    enum: SortBy,
    required: false,
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy?: SortBy = DefaultSort.BY;
}
