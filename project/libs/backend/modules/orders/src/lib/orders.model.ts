import { Order, OrderSeeder } from '@project/core';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder';
import { UserModel } from '@project/user-module';
import { OrderValidator } from '@project/validation';
import { PaymentVariant } from '@project/enums';
import { TrainingModel } from '@project/trainings-module';

@Schema({
  collection: 'orders',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class OrdersModel extends Document implements Order {
  @Factory((_, ctx: OrderSeeder) => ctx.userId)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public userId: string;

  @Factory((_, ctx: OrderSeeder) => ctx.training.id)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: TrainingModel.name,
    required: true,
  })
  public trainingId: string;

  @Factory((_, ctx: OrderSeeder) => ctx.training.price)
  @Prop({
    required: true,
    type: Number,
  })
  public trainingPrice!: number;

  @Factory((_, ctx: OrderSeeder) => ctx.quantity)
  @Prop({
    required: true,
    type: Number,
    min: OrderValidator.Quantity.Min,
    max: OrderValidator.Quantity.Max,
  })
  public quantity!: number;

  @Factory((_, ctx: OrderSeeder) => ctx.totalSum)
  @Prop({
    required: true,
    type: Number,
  })
  public totalSum!: number;

  @Factory((_, ctx: OrderSeeder) => ctx.type)
  @Prop({
    required: true,
    type: String,
  })
  public type!: string;

  @Factory((_, ctx: OrderSeeder) => ctx.paymentType)
  @Prop({
    required: true,
    type: String,
    enum: PaymentVariant,
  })
  public paymentType!: PaymentVariant;
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersModel);
