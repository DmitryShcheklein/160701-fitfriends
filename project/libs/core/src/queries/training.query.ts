import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  Max,
  ValidateNested,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  DefaultProducts,
  DefaultSort,
  DEFAULT_PAGE_COUNT,
} from '../const/product.const';
import {
  FitnessLevel,
  SortBy,
  SortDirection,
  UserGender,
  WorkoutDuration,
  WorkoutType,
} from '@project/enums';
import { PriceQueryDto } from '@project/dto';

export class TrainingsQuery {
  @ApiProperty({
    description: 'The minimum/maximum number filter price',
    type: PriceQueryDto,
    required: false,
  })
  @ValidateNested()
  public priceRange?: PriceQueryDto;

  @ApiProperty({
    description: 'The maximum number of products to return',
    default: DefaultProducts.COUNT_LIMIT,
    type: Number,
    required: false,
  })
  @Transform(({ value }) => Number(value) || DefaultProducts.COUNT_LIMIT)
  @IsNumber()
  @Max(DefaultProducts.MAX_COUNT_LIMIT)
  @IsOptional()
  public limit?: number = DefaultProducts.COUNT_LIMIT;

  @ApiProperty({
    description: 'The direction in which to sort the products',
    enum: SortDirection,
    default: DefaultSort.DIRECTION,
    required: false,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = DefaultSort.DIRECTION;

  @ApiProperty({
    description: 'The sort type the products',
    default: DefaultSort.BY,
    enum: SortBy,
    required: false,
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy?: SortBy = DefaultSort.BY;

  @ApiProperty({
    description: 'The page number',
    default: DEFAULT_PAGE_COUNT,
    type: Number,
    required: false,
  })
  @Transform(({ value }) => Number(value) || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({
    description: 'The type of training',
    enum: WorkoutType,
    required: false,
  })
  @IsEnum(WorkoutType)
  @IsOptional()
  public trainingType?: WorkoutType;

  @ApiProperty({
    description: 'The fitness level of the training',
    enum: FitnessLevel,
    required: false,
  })
  @IsEnum(FitnessLevel)
  @IsOptional()
  public level?: FitnessLevel;

  @ApiProperty({
    description: 'The duration of the training',
    enum: WorkoutDuration,
    required: false,
  })
  @IsEnum(WorkoutDuration)
  @IsOptional()
  public duration?: WorkoutDuration;

  @ApiProperty({
    description: 'The gender for which the training is targeted',
    enum: UserGender,
    required: false,
  })
  @IsEnum(UserGender)
  @IsOptional()
  public gender?: UserGender;
}
