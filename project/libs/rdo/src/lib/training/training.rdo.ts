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

export class TrainingRdo implements Training {
  @Expose()
  @ApiProperty({
    description: 'Уникальный идентификатор тренировки',
    example: 'df1912151f3c407d96b2390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'Дата создания тренировки',
    example: '2024-01-09T14:55:34.697Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Название тренировки',
    example: 'Утренняя йога',
    minLength: TrainingValidation.Name.Min,
    maxLength: TrainingValidation.Name.Max,
  })
  public name!: string;

  @Expose()
  @ApiProperty({
    description: 'Фоновое изображение для карточки тренировки',
    example: 'http://localhost:3333/static/images/yoga.png',
  })
  public backgroundImage!: string;

  @Expose()
  @ApiProperty({
    description: 'Уровень тренировки',
    example: FitnessLevel.Beginner,
    enum: FitnessLevel,
  })
  public level!: FitnessLevel;

  @Expose()
  @ApiProperty({
    description: 'Тип тренировки',
    example: WorkoutType.Yoga,
    enum: WorkoutType,
  })
  public trainingType!: WorkoutType;

  @Expose()
  @ApiProperty({
    description: 'Продолжительность тренировки',
    example: WorkoutDuration.Min10to30,
    enum: WorkoutDuration,
  })
  public duration!: WorkoutDuration;

  @Expose()
  @ApiProperty({
    description: 'Цена тренировки в рублях',
    example: TrainingValidation.Price.Min,
    minimum: TrainingValidation.Price.Min,
    maximum: TrainingValidation.Price.Max,
  })
  public price!: number;

  @Expose()
  @ApiProperty({
    description: 'Количество калорий, сжигаемых за тренировку',
    example: TrainingValidation.Calories.Max,
    minimum: TrainingValidation.Calories.Min,
    maximum: TrainingValidation.Calories.Max,
  })
  public calories!: number;

  @Expose()
  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Отличная утренняя йога для начинающих.',
    minLength: TrainingValidation.Description.Min,
    maxLength: TrainingValidation.Description.Max,
  })
  public description!: string;

  @Expose()
  @ApiProperty({
    description: 'Пол пользователя, для которого предназначена тренировка',
    example: 'для всех',
    enum: UserGender,
  })
  public gender!: UserGender;

  @Expose()
  @ApiProperty({
    description: 'Ссылка на видео тренировки',
    example: 'http://localhost:3333/static/videos/yoga.mp4',
  })
  public video!: string;

  @Expose()
  @ApiProperty({
    description: 'Рейтинг тренировки',
    example: 4.5,
    minimum: TrainingValidation.Rating.Min,
    maximum: TrainingValidation.Rating.Max,
    default: 0,
  })
  public rating!: number;

  @Expose()
  @ApiProperty({
    description: 'Имя тренера, создавшего тренировку',
    example: 'Иван',
    minLength: TrainingValidation.Coach.Min,
    maxLength: TrainingValidation.Coach.Max,
  })
  public coach!: string;

  @Expose()
  @ApiProperty({
    description: 'Признак участия тренировки в специальном предложении',
    example: true,
    default: false,
  })
  public specialOffer!: boolean;
}
