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

@Schema({
  collection: 'trainings',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class TrainingModel extends Document implements Training {
  @Prop({
    required: true,
    minlength: TrainingValidation.Name.Min,
    maxlength: TrainingValidation.Name.Max,
  })
  public name!: string;

  @Prop({
    required: true,
  })
  public backgroundImage!: string;

  @Prop({
    enum: FitnessLevel,
    required: true,
    type: String,
  })
  public level!: FitnessLevel;

  @Prop({
    enum: WorkoutType,
    required: true,
    type: String,
  })
  public trainingType!: WorkoutType;

  @Prop({
    enum: WorkoutDuration,
    required: true,
    type: String,
  })
  public duration!: WorkoutDuration;

  @Prop({
    required: true,
    min: TrainingValidation.Price.Min,
    max: TrainingValidation.Price.Max,
    type: Number,
  })
  public price!: number;

  @Prop({
    required: true,
    min: TrainingValidation.Calories.Min,
    max: TrainingValidation.Calories.Max,
    type: Number,
  })
  public calories!: number;

  @Prop({
    required: true,
    minlength: TrainingValidation.Description.Min,
    maxlength: TrainingValidation.Description.Max,
  })
  public description!: string;

  @Prop({
    enum: UserGender,
    required: true,
    type: String,
  })
  public gender!: UserGender;

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

  @Prop({
    required: true,
    minlength: TrainingValidation.Coach.Min,
    maxlength: TrainingValidation.Coach.Max,
  })
  public coach!: string;

  @Prop({
    default: false,
  })
  public specialOffer!: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
