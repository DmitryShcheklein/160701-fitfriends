import { UserTrainingConfig } from '@project/core';
import { ApiProperty } from '@nestjs/swagger';
import { User as UserValidation } from '@project/validation';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
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
  @IsEnum(WorkoutType)
  public specialisation: WorkoutType[];

  @ApiProperty({
    description: 'User caloriesPerDay',
    example: UserValidation.CaloriesPerDay.Min,
    minLength: UserValidation.CaloriesPerDay.Min,
    maxLength: UserValidation.CaloriesPerDay.Max,
  })
  @Min(UserValidation.CaloriesPerDay.Min)
  @Max(UserValidation.CaloriesPerDay.Max)
  @IsNumber()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'User CaloriesWantLost',
    example: UserValidation.CaloriesWantLost.Min,
    minLength: UserValidation.CaloriesWantLost.Min,
    maxLength: UserValidation.CaloriesWantLost.Max,
  })
  @Min(UserValidation.CaloriesWantLost.Min)
  @Max(UserValidation.CaloriesWantLost.Max)
  @IsNumber()
  public caloriesWantLost: number;
}
