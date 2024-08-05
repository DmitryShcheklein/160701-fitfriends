import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Training } from '@project/core';
import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';
import { TrainingValidation } from '@project/validation';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';

@Schema({
  collection: 'trainings',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class TrainingModel extends Document implements Training {
  @Factory((faker) => faker.helpers.enumValue(WorkoutType))
  @Prop({
    required: true,
    minlength: TrainingValidation.Name.Min,
    maxlength: TrainingValidation.Name.Max,
  })
  public name!: string;

  @Factory(
    (faker, ctx) =>
      `${ctx.mockImagePath}trainings/${faker.helpers.arrayElement(
        Array.from({ length: 4 }, (el, idx) => `training-${++idx}@2x.png`)
      )}`
  )
  @Prop({
    required: true,
  })
  public backgroundImage!: string;

  @Factory((faker) => faker.helpers.enumValue(FitnessLevel))
  @Prop({
    enum: FitnessLevel,
    required: true,
    type: String,
  })
  public level!: FitnessLevel;

  @Factory((_, ctx) => ctx.name)
  @Prop({
    enum: WorkoutType,
    required: true,
    type: String,
  })
  public trainingType!: WorkoutType;

  @Factory((faker) => faker.helpers.enumValue(WorkoutDuration))
  @Prop({
    enum: WorkoutDuration,
    required: true,
    type: String,
  })
  public duration!: WorkoutDuration;

  @Factory((faker) =>
    faker.commerce.price({ min: TrainingValidation.Price.Min, max: 3_000 })
  )
  @Prop({
    required: true,
    min: TrainingValidation.Price.Min,
    max: TrainingValidation.Price.Max,
    type: Number,
  })
  public price!: number;

  @Factory((faker) =>
    faker.number.int({
      min: TrainingValidation.Calories.Min,
      max: TrainingValidation.Calories.Max,
    })
  )
  @Prop({
    required: true,
    min: TrainingValidation.Calories.Min,
    max: TrainingValidation.Calories.Max,
    type: Number,
  })
  public calories!: number;

  @Factory(() =>
    fakerRU.lorem.sentence().substring(0, TrainingValidation.Description.Max)
  )
  @Prop({
    required: true,
    minlength: TrainingValidation.Description.Min,
    maxlength: TrainingValidation.Description.Max,
  })
  public description!: string;

  @Factory((faker) => faker.helpers.enumValue(UserGender))
  @Prop({
    enum: UserGender,
    required: true,
    type: String,
  })
  public gender!: UserGender;

  @Factory((faker) =>
    faker.helpers.arrayElement([
      'https://videos.pexels.com/video-files/2025457/2025457-hd_1280_720_30fps.mp4',
      'https://videos.pexels.com/video-files/4065388/4065388-uhd_2560_1440_30fps.mp4',
      'https://videos.pexels.com/video-files/3196218/3196218-uhd_2560_1440_25fps.mp4',
      'https://videos.pexels.com/video-files/2790138/2790138-uhd_2560_1440_25fps.mp4',
      'https://videos.pexels.com/video-files/4761711/4761711-uhd_2732_1440_25fps.mp4',
    ])
  )
  @Prop({
    required: true,
  })
  public video!: string;

  @Factory((faker) =>
    faker.number.int({
      min: TrainingValidation.Rating.Min,
      max: TrainingValidation.Rating.Max,
    })
  )
  @Prop({
    default: 0,
    type: Number,
    min: TrainingValidation.Rating.Min,
    max: TrainingValidation.Rating.Max,
  })
  public rating!: number;

  @Factory(() =>
    fakerRU.person.firstName().substring(0, TrainingValidation.Coach.Max)
  )
  @Prop({
    required: true,
    minlength: TrainingValidation.Coach.Min,
    maxlength: TrainingValidation.Coach.Max,
  })
  public coach!: string;

  @Factory((faker) => faker.datatype.boolean())
  @Prop({
    default: false,
  })
  public specialOffer!: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
