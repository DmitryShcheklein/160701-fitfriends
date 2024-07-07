import { ApiProperty } from '@nestjs/swagger';
import { UserTrainingConfig } from '@project/core';
import { FitnessLevel, WorkoutDuration, WorkoutType } from '@project/enums';
import { User as UserValidation } from '@project/validation';
import { Expose } from 'class-transformer';

export class UserConfigRdo implements UserTrainingConfig {
  @ApiProperty({
    description: 'User fitness level',
    enum: FitnessLevel,
    example: FitnessLevel.Amateur,
  })
  @Expose()
  public level: FitnessLevel;

  @ApiProperty({
    description: 'User workout duration',
    example: WorkoutDuration.Min10to30,
    enum: WorkoutDuration,
  })
  @Expose()
  public duration: WorkoutDuration;

  @ApiProperty({
    isArray: true,
    description: 'User specialisation',
    enum: WorkoutType,
    example: [WorkoutType.Aerobics, WorkoutType.Boxing],
  })
  @Expose()
  public specialisation: WorkoutType[];

  @ApiProperty({
    description: 'User caloriesPerDay',
    example: UserValidation.TrainingConfig.CaloriesPerDay.Min,
    minLength: UserValidation.TrainingConfig.CaloriesPerDay.Min,
    maxLength: UserValidation.TrainingConfig.CaloriesPerDay.Max,
  })
  @Expose()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User CaloriesWantLost',
    example: UserValidation.TrainingConfig.CaloriesWantLost.Min,
    minLength: UserValidation.TrainingConfig.CaloriesWantLost.Min,
    maxLength: UserValidation.TrainingConfig.CaloriesWantLost.Max,
  })
  @Expose()
  public caloriesWantLost: number;

  @ApiProperty({
    description: 'User training readines',
    example: true,
  })
  @Expose()
  public trainingReadiness: boolean;
}
