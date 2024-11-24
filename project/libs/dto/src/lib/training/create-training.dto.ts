import { ApiProperty } from '@nestjs/swagger';
import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TrainingValidation } from '@project/validation';
import { Transform } from 'class-transformer';

export class CreateTrainingDto {
  @ApiProperty({
    required: true,
    description: 'Training name',
    example: 'Advanced Workout',
    minLength: TrainingValidation.Name.Min,
    maxLength: TrainingValidation.Name.Max,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(TrainingValidation.Name.Min)
  @MaxLength(TrainingValidation.Name.Max)
  public name!: string;

  @ApiProperty({
    required: true,
    description: 'Fitness level',
    example: FitnessLevel.Amateur,
    enum: FitnessLevel,
  })
  @IsEnum(FitnessLevel)
  @IsNotEmpty()
  public level!: FitnessLevel;

  @ApiProperty({
    description: 'Workout type',
    example: WorkoutType.Boxing,
    enum: WorkoutType,
  })
  @IsEnum(WorkoutType)
  @IsNotEmpty()
  public trainingType!: WorkoutType;

  @ApiProperty({
    required: true,
    description: 'Duration in minutes',
    example: WorkoutDuration.Min10to30,
  })
  @IsEnum(WorkoutDuration)
  @IsNotEmpty()
  public duration!: WorkoutDuration;

  @ApiProperty({
    required: true,
    description: 'Price',
    example: 2000,
    minimum: TrainingValidation.Price.Min,
    maximum: TrainingValidation.Price.Max,
  })
  @Min(TrainingValidation.Price.Min)
  @Max(TrainingValidation.Price.Max)
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  public price!: number;

  @ApiProperty({
    required: true,
    description: 'Calories burned per session',
    example: TrainingValidation.Calories.Min,
    minimum: TrainingValidation.Calories.Min,
    maximum: TrainingValidation.Calories.Max,
  })
  @Min(TrainingValidation.Calories.Min)
  @Max(TrainingValidation.Calories.Max)
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  public calories!: number;

  @ApiProperty({
    required: true,
    description: 'Training description',
    example: 'A high-intensity workout targeting full-body fitness.',
    maxLength: TrainingValidation.Description.Max,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(TrainingValidation.Description.Max)
  public description!: string;

  @ApiProperty({
    required: true,
    description: 'Target audience gender',
    example: UserGender.Male,
    enum: UserGender,
  })
  @IsEnum(UserGender)
  @IsNotEmpty()
  public gender!: UserGender;

  @ApiProperty({
    required: true,
    description: 'Video .mov, .avi, .mp4 file',
    format: 'binary',
    enum: ['video/mov', 'video/avi', 'video/mp4'],
  })
  public video!: Express.Multer.File;
}
