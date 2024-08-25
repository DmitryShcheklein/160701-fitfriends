import {Order} from "@project/core";
import { Document } from 'mongoose';
import {  Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'orders',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class OrdersModel extends Document implements Order {}

export const OrdersSchema = SchemaFactory.createForClass(OrdersModel);
