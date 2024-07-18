import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review } from '@project/core';
import { Factory } from 'nestjs-seeder';

@Schema({
  collection: 'reviews',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ReviewModel extends Document implements Review {
  @Factory((faker) => faker.datatype.uuid())
  @Prop({
    required: true,
    ref: 'User',
  })
  public author!: string;

  @Factory((faker) => faker.datatype.uuid())
  @Prop({
    required: true,
    ref: 'Training',
  })
  public training!: string;

  @Factory((faker) => faker.datatype.number({ min: 1, max: 5 }))
  @Prop({
    required: true,
    min: 1,
    max: 5,
    type: Number,
  })
  public rating!: number;

  @Factory((faker) => faker.lorem.paragraphs(3))
  @Prop({
    required: true,
    minlength: 100,
    maxlength: 1024,
  })
  public text!: string;

  @Factory(() => new Date())
  @Prop({
    required: true,
    default: Date.now,
  })
  public createdAt!: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
