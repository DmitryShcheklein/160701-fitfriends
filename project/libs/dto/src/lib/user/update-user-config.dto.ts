import { UserTrainingConfig } from '@project/core';
import { ApiProperty } from '@nestjs/swagger';
import { User as UserValidation } from '@project/validation';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { FitnessLevel, WorkoutDuration, WorkoutType } from '@project/enums';

export class UpdateUserConfigDto implements Partial<UserTrainingConfig> {
  @ApiProperty({
    description: 'User fitness level',
    enum: FitnessLevel,
    example: FitnessLevel.Amateur,
  })
  @IsEnum(FitnessLevel)
  public level?: FitnessLevel;

  @ApiProperty({
    description: 'User workout duration',
    enum: WorkoutDuration,
    example: WorkoutDuration.Min10to30,
  })
  @IsEnum(WorkoutDuration)
  public duration?: WorkoutDuration;

  @ApiProperty({
    isArray: true,
    description: 'User specialisation',
    enum: WorkoutType,
    example: [WorkoutType.Aerobics, WorkoutType.Boxing],
  })
  @IsEnum(WorkoutType)
  public specialisation?: WorkoutType[];

  @ApiProperty({
    description: 'User caloriesPerDay',
    example: UserValidation.CaloriesPerDay.Min,
    minLength: UserValidation.CaloriesPerDay.Min,
    maxLength: UserValidation.CaloriesPerDay.Max,
  })
  @MinLength(UserValidation.CaloriesPerDay.Min)
  @MaxLength(UserValidation.CaloriesPerDay.Max)
  @IsNumber()
  public caloriesPerDay?: number;

  @ApiProperty({
    description: 'User CaloriesWantLost',
    example: UserValidation.CaloriesWantLost.Min,
    minLength: UserValidation.CaloriesWantLost.Min,
    maxLength: UserValidation.CaloriesWantLost.Max,
  })
  @MinLength(UserValidation.CaloriesWantLost.Min)
  @MaxLength(UserValidation.CaloriesWantLost.Max)
  @IsNumber()
  public caloriesWantLost?: number;

  @ApiProperty({
    required: false,
    description: 'User training readines',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  public trainingReadiness?: boolean;
}
