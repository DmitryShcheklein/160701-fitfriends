import { Balance } from '@project/core';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';
import { UserModel } from '@project/user-module';
import { PaymentVariant } from '@project/enums';

@Schema({
  collection: 'balance',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class BalanceModel extends Document implements Balance {
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
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceModel);
