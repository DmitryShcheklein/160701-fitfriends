import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingRdo } from './training.rdo';
import { PaginationResult, TrainingsFilter } from '@project/core';
import { TrainingsFiltersRdo } from './filters.rdo';

export class TrainingsWithPaginationRdo
  implements PaginationResult<TrainingRdo, TrainingsFilter>
{
  @Expose()
  @ApiProperty({
    description: 'Список тренировок',
    example: TrainingRdo,
    isArray: true,
    type: TrainingRdo,
  })
  public entities!: TrainingRdo[];

  @Expose()
  @ApiProperty({
    description: 'Общее количество страниц',
    example: 10,
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'Общее количество тренировок',
    example: 100,
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'Текущая страница',
    example: 1,
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'Количество элементов на странице',
    example: 20,
  })
  public itemsPerPage!: number;

  @Expose()
  @ApiProperty({
    description: 'Фильтры для тренировок',
    type: TrainingsFiltersRdo,
  })
  public filters!: TrainingsFiltersRdo;
}
