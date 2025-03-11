import {
  IsEnum,
  IsIn,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultSort } from '../const/main.const';
import {
  FitnessLevel,
  SortBy,
  UserGender,
  WorkoutDuration,
  WorkoutType,
} from '@project/enums';
import { PriceQueryDto } from '@project/dto';
import { BaseQuery } from './base.query';

export class FriendsQuery extends BaseQuery {
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
