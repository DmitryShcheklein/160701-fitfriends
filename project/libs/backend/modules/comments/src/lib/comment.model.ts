import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@project/core';
import { CommentValidator } from '@project/validation';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';

@Schema({
  collection: 'comments',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class CommentModel extends Document implements Comment {
  @Factory((faker) =>
    faker.number.int({
      min: CommentValidator.Rating.Min,
      max: CommentValidator.Rating.Max,
    })
  )
  @Prop({
    required: true,
    type: Number,
    minlength: CommentValidator.Rating.Min,
    maxlength: CommentValidator.Rating.Max,
  })
  public rating!: number;

  @Factory(() =>
    fakerRU.lorem.sentence().substring(0, CommentValidator.Message.Max)
  )
  @Prop({
    required: true,
    type: String,
    minlength: CommentValidator.Message.Min,
    maxlength: CommentValidator.Message.Max,
  })
  public message: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'trainings',
    required: true,
  })
  public trainingId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  public userId: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
