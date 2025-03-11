import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingRdo } from './training.rdo';
import { PaginationResult, TrainingsFilter } from '@project/core';
import { TrainingsFiltersRdo } from './filters.rdo';
import { PaginationRdo } from '../pagination.rdo';

export class TrainingsWithPaginationRdo
  extends PaginationRdo
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
    description: 'Фильтры для тренировок',
    type: TrainingsFiltersRdo,
  })
  public filters!: TrainingsFiltersRdo;
}
