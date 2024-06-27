import { ApiProperty } from '@nestjs/swagger';
import {
  FitnessLevel,
  UserTrainingConfig,
  WorkoutDuration,
  WorkoutType,
} from '@project/core';
import { User as UserValidation } from '@project/validation';

export class UserConfigRdo implements UserTrainingConfig {
  @ApiProperty({
    description: 'User fitness level',
    enum: FitnessLevel,
    example: FitnessLevel.Amateur,
  })
  public level: FitnessLevel;

  @ApiProperty({
    description: 'User workout duration',
    example: WorkoutDuration.Min10to30,
    enum: WorkoutDuration,
  })
  public duration: WorkoutDuration;

  @ApiProperty({
    isArray: true,
    description: 'User specialisation',
    enum: WorkoutType,
    example: [WorkoutType.Aerobics, WorkoutType.Boxing],
  })
  public specialisation: WorkoutType[];

  @ApiProperty({
    description: 'User caloriesPerDay',
    example: UserValidation.CaloriesPerDay.Min,
    minLength: UserValidation.CaloriesPerDay.Min,
    maxLength: UserValidation.CaloriesPerDay.Max,
  })
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User CaloriesWantLost',
    example: UserValidation.CaloriesWantLost.Min,
    minLength: UserValidation.CaloriesWantLost.Min,
    maxLength: UserValidation.CaloriesWantLost.Max,
  })
  public caloriesWantLost: number;
}
