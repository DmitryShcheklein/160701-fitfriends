import { UserTrainingConfig } from '@project/core';
import { ApiProperty } from '@nestjs/swagger';
import { User as UserValidation } from '@project/validation';
import { ArrayMaxSize, IsEnum, IsNumber, Max, Min } from 'class-validator';
import { FitnessLevel, WorkoutDuration, WorkoutType } from '@project/enums';

export class CreateUserConfigDto
  implements Omit<UserTrainingConfig, 'trainingReadiness'>
{
  @ApiProperty({
    description: 'User fitness level',
    enum: FitnessLevel,
    example: FitnessLevel.Amateur,
  })
  @IsEnum(FitnessLevel)
  public level: FitnessLevel;

  @ApiProperty({
    description: 'User workout duration',
    enum: WorkoutDuration,
    example: WorkoutDuration.Min10to30,
  })
  @IsEnum(WorkoutDuration)
  public duration: WorkoutDuration;

  @ApiProperty({
    isArray: true,
    description: 'User specialisation',
    enum: WorkoutType,
    example: [WorkoutType.Aerobics, WorkoutType.Boxing],
  })
  @IsEnum(WorkoutType, { each: true })
  @ArrayMaxSize(UserValidation.TrainingConfig.Specialisation.MaxLength)
  public specialisation: WorkoutType[];

  @ApiProperty({
    description: 'User caloriesPerDay',
    example: UserValidation.TrainingConfig.CaloriesPerDay.Min,
    minLength: UserValidation.TrainingConfig.CaloriesPerDay.Min,
    maxLength: UserValidation.TrainingConfig.CaloriesPerDay.Max,
  })
  @Min(UserValidation.TrainingConfig.CaloriesPerDay.Min)
  @Max(UserValidation.TrainingConfig.CaloriesPerDay.Max)
  @IsNumber()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User CaloriesWantLost',
    example: UserValidation.TrainingConfig.CaloriesWantLost.Min,
    minLength: UserValidation.TrainingConfig.CaloriesWantLost.Min,
    maxLength: UserValidation.TrainingConfig.CaloriesWantLost.Max,
  })
  @Min(UserValidation.TrainingConfig.CaloriesWantLost.Min)
  @Max(UserValidation.TrainingConfig.CaloriesWantLost.Max)
  @IsNumber()
  public caloriesWantLost: number;
}
