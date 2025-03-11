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

export class TrainingsQuery extends BaseQuery {
  @ApiProperty({
    description: 'The minimum/maximum number filter price',
    type: PriceQueryDto,
    required: false,
  })
  @ValidateNested()
  public priceRange?: PriceQueryDto;

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
    description: 'The type of training',
    enum: WorkoutType,
    required: false,
    isArray: true,
  })
  @IsEnum(WorkoutType, { each: true })
  @IsOptional()
  public trainingType?: WorkoutType[];

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
    isArray: true,
  })
  @IsEnum(WorkoutDuration, { each: true })
  @IsOptional()
  public duration?: WorkoutDuration[];

  @ApiProperty({
    description: 'Special training',
    required: false,
    example: true,
  })
  @IsOptional()
  public specialOffer?: boolean;

  @ApiProperty({
    description: 'The gender for which the training is targeted',
    enum: UserGender,
    required: false,
  })
  @IsEnum(UserGender)
  @IsOptional()
  public gender?: UserGender[];

  @ApiProperty({
    description: 'TrainerId',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  public trainerId?: string;
}
