import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { DefaultItemsLimit, DefaultSort } from '../const';
import { SortDirection } from '@project/enums';

export class BaseQuery {
  @ApiProperty({
    description: 'The page number',
    type: Number,
    required: false,
  })
  // @Transform(({ value }) => {
  //   console.log(value);
  //
  //   return Number(value) || DEFAULT_PAGE_NUMBER;
  // })
  @IsOptional()
  public page?: number;

  @ApiProperty({
    description: 'The maximum number of items to return',
    default: DefaultItemsLimit.Min,
    type: Number,
    required: false,
  })
  @Transform(({ value }) => Number(value) || DefaultItemsLimit.Max)
  @IsNumber()
  @Max(DefaultItemsLimit.Max)
  @IsOptional()
  public limit?: number = DefaultItemsLimit.Max;

  @ApiProperty({
    description: 'The direction in which to sort the items',
    enum: SortDirection,
    default: DefaultSort.DIRECTION,
    required: false,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = DefaultSort.DIRECTION;
}
