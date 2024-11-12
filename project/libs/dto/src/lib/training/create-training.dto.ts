import { ApiProperty } from '@nestjs/swagger';
import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TrainingValidation } from '@project/validation';

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Training name',
    example: 'Advanced HIIT Workout',
    minLength: TrainingValidation.Name.Min,
    maxLength: TrainingValidation.Name.Max,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(TrainingValidation.Name.Min)
  @MaxLength(TrainingValidation.Name.Max)
  public name!: string;

  @ApiProperty({
    description: 'Background image URL',
    example: 'https://example.com/image.jpg',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public backgroundImage!: string;

  @ApiProperty({
    description: 'Fitness level',
    example: FitnessLevel.Amateur,
    enum: FitnessLevel,
  })
  @IsNotEmpty()
  public level!: FitnessLevel;

  @ApiProperty({
    description: 'Workout type',
    example: WorkoutType.Boxing,
    enum: WorkoutType,
  })
  @IsNotEmpty()
  public trainingType!: WorkoutType;

  @ApiProperty({
    description: 'Duration in minutes',
    example: WorkoutDuration.Min10to30,
  })
  @IsNumber()
  @IsNotEmpty()
  public duration!: WorkoutDuration;

  @ApiProperty({
    description: 'Price',
    example: 2000,
    minimum: TrainingValidation.Price.Min,
    maximum: TrainingValidation.Price.Max,
  })
  @IsNumber()
  @Min(TrainingValidation.Price.Min)
  @Max(TrainingValidation.Price.Max)
  @IsNotEmpty()
  public price!: number;

  @ApiProperty({
    description: 'Calories burned per session',
    example: TrainingValidation.Calories.Min,
    minimum: TrainingValidation.Calories.Min,
    maximum: TrainingValidation.Calories.Max,
  })
  @IsNumber()
  @Min(TrainingValidation.Calories.Min)
  @Max(TrainingValidation.Calories.Max)
  @IsNotEmpty()
  public calories!: number;

  @ApiProperty({
    description: 'Training description',
    example: 'A high-intensity workout targeting full-body fitness.',
    maxLength: TrainingValidation.Description.Max,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(TrainingValidation.Description.Max)
  public description!: string;

  @ApiProperty({
    description: 'Target audience gender',
    example: UserGender.Male,
    enum: UserGender,
  })
  @IsNotEmpty()
  public gender!: UserGender;

  @ApiProperty({
    description: 'Video URL for the training session',
    example: 'https://example.com/training-video.mp4',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public video!: string;

  @ApiProperty({
    description: 'Average rating of the training',
    example: 4.5,
    minimum: TrainingValidation.Rating.Min,
    maximum: TrainingValidation.Rating.Max,
  })
  @IsNumber()
  @Min(TrainingValidation.Rating.Min)
  @Max(TrainingValidation.Rating.Max)
  @IsNotEmpty()
  public rating!: number;

  @ApiProperty({
    description: 'Special offer availability',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  public specialOffer: boolean;
}
