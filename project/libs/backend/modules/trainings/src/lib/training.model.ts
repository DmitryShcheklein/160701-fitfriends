import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Training, TrainingSeederData } from '@project/core';
import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';
import { TrainingValidation } from '@project/validation';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';
import { UserModel } from '@project/user-module';

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
    (faker, ctx: TrainingSeederData) =>
      `${ctx.mockImagePath}trainings/${faker.helpers.arrayElement(
        ctx.backgroundImages
      )}`
  )
  @Prop({
    required: false,
    default: '',
  })
  public backgroundImage?: string;

  @Factory((faker) => faker.helpers.enumValue(FitnessLevel))
  @Prop({
    enum: FitnessLevel,
    required: true,
    type: String,
  })
  public level!: FitnessLevel;

  @Factory((faker) => faker.helpers.enumValue(WorkoutType))
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

  @Factory((faker, ctx: TrainingSeederData) =>
    faker.helpers.arrayElement(ctx.videoLinks)
  )
  @Prop({
    required: true,
  })
  public video!: string;

  @Prop({
    default: 0,
    type: Number,
    min: TrainingValidation.Rating.Min,
    max: TrainingValidation.Rating.Max,
  })
  public rating!: number;

  @Factory((faker, ctx: TrainingSeederData) =>
    faker.helpers.arrayElement(ctx.userIds)
  )
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public trainerId!: string;

  @Factory((faker) => faker.datatype.boolean())
  @Prop({
    default: false,
  })
  public specialOffer!: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
