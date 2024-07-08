import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  WorkoutType,
  FitnessLevel,
  SortBy,
  SortDirection,
} from '@project/enums';
import { PriceRdo } from './price.rdo';
import { SortDefaultRdo } from './sort-default.rdo';
import { TrainingsFilter } from '@project/core';

export class TrainingsFiltersRdo implements TrainingsFilter {
  @Expose()
  @ApiProperty({
    description: 'Типы тренировок',
    isArray: true,
    enum: WorkoutType,
  })
  trainingType: WorkoutType[];

  @Expose()
  @ApiProperty({
    description: 'Уровни сложности тренировок',
    isArray: true,
    enum: FitnessLevel,
  })
  level: FitnessLevel[];

  @Expose()
  @ApiProperty({
    description: 'Параметры сортировки тренировок',
    enum: SortBy,
    example: {
      [SortBy.createdAt]: SortBy.createdAt,
    },
  })
  sortBy: SortBy;

  @Expose()
  @ApiProperty({
    description: 'Направление сортировки тренировок',
    enum: SortDirection,
    example: {
      [SortDirection.Asc]: SortDirection.Asc,
    },
  })
  sortDirection: SortDirection;

  @Expose()
  @ApiProperty({
    description: 'Минимальная и максимальная цена тренировок',
    type: PriceRdo,
  })
  price: PriceRdo;

  @Expose()
  @ApiProperty({
    description: 'Стандартная сортировка тренировок',
  })
  defaultSort: SortDefaultRdo;
}
