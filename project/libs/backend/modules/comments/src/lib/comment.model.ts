import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@project/core';
import { CommentValidation } from '@project/validation';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';
import { UserModel } from '@project/user-module';

@Schema({
  collection: 'comments',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class CommentModel extends Document implements Comment {
  @Factory((faker) =>
    faker.number.int({
      min: CommentValidation.Rating.Min,
      max: CommentValidation.Rating.Max,
    })
  )
  @Prop({
    required: true,
    type: Number,
    minlength: CommentValidation.Rating.Min,
    maxlength: CommentValidation.Rating.Max,
  })
  public rating!: number;

  @Factory(() =>
    fakerRU.lorem
      .sentence({
        min: CommentValidation.Message.Min,
        max: CommentValidation.Message.Max,
      })
      .substring(0, CommentValidation.Message.Min)
  )
  @Prop({
    required: true,
    type: String,
    minlength: CommentValidation.Message.Min,
    maxlength: CommentValidation.Message.Max,
  })
  public message: string;

  @Factory((_, ctx) => fakerRU.helpers.arrayElement(ctx.trainingIds))
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  public trainingId: string;

  @Factory((_, ctx) => fakerRU.helpers.arrayElement(ctx.userIds))
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public userId: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
