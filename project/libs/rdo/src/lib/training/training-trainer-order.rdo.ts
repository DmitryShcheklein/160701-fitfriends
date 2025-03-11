import { ApiProperty } from '@nestjs/swagger';
import { Training } from '@project/core';

import { Expose } from 'class-transformer';

import { TrainingRdo } from './training.rdo';

export class TrainingTrainerRdo extends TrainingRdo implements Training {
  @Expose()
  @ApiProperty({
    description: 'Уникальный идентификатор тренировки',
    example: 'df1912151f3c407d96b2390bdfae1961',
  })
  public _id!: string; // TODO доработать запрос под id

  @Expose()
  @ApiProperty({
    description: 'Тренер, создавшего тренировку',
  })
  public trainerId!: string;
}
