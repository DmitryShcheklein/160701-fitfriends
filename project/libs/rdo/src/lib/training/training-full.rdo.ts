import { ApiProperty } from '@nestjs/swagger';
import { Training } from '@project/core';
import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';
import { Expose } from 'class-transformer';
import { TrainingValidation } from '@project/validation';
import { UserRdo } from '../user/user.rdo';
import { TrainingRdo } from './training.rdo';

export class TrainingFullRdo extends TrainingRdo {
  @Expose({ name: 'trainerId' })
  @ApiProperty({
    description: 'Тренер, создавшего тренировку',
  })
  public trainerId!: UserRdo;
}
