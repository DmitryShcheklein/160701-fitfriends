import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingRdo } from '../training/training.rdo';
import { TrainingTrainerRdo } from '../training/training-trainer-order.rdo';

export class OrderTrainerRdo {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Общее число купленных тренировок',
    example: 100,
  })
  public totalCount!: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Общая сумма купленных тренировок',
    example: 10_000,
  })
  public totalSum!: number;

  @Expose()
  @ApiProperty({
    type: TrainingRdo,
    description: 'Тренировка',
  })
  public training!: TrainingTrainerRdo;
}
