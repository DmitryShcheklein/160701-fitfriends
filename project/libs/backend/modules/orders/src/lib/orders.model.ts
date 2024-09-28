import { Order } from '@project/core';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';
import { UserModel } from '@project/user-module';
import { OrderValidator } from '@project/validation';
import { PaymentVariant } from '@project/enums';

@Schema({
  collection: 'orders',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class OrdersModel extends Document implements Order {
  @Factory((_, ctx) => fakerRU.helpers.arrayElement(ctx.userIds))
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public userId: string;

  @Factory((_, ctx) => fakerRU.helpers.arrayElement(ctx.trainingIds))
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  public trainingId: string;

  @Prop({
    required: true,
    type: Number,
  })
  public trainingPrice!: number;

  @Prop({
    required: true,
    type: Number,
    min: OrderValidator.Quantity.Min,
    max: OrderValidator.Quantity.Max,
  })
  public quantity!: number;

  @Prop({
    required: true,
    type: Number,
  })
  public totalSum!: number;

  @Prop({
    required: true,
    type: String,
  })
  public type!: string;

  @Prop({
    required: true,
    type: String,
    enum: PaymentVariant,
  })
  public paymentType!: PaymentVariant;
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersModel);
