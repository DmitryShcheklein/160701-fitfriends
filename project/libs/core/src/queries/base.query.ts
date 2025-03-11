import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { DefaultItemsLimit, DefaultSort } from '../const';
import { SortDirection } from '@project/enums';

export class BaseQuery {
  @ApiProperty({
    description: 'The page number',
    type: Number,
    example: 1,
    required: false,
  })
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  public page?: number = 1;

  @ApiProperty({
    description: 'The maximum number of items to return',
    default: DefaultItemsLimit.Min,
    type: Number,
    required: false,
  })
  @Transform(({ value }) => Number(value))
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
