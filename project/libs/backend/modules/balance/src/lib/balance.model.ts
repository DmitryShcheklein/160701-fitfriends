import { Balance } from '@project/core';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Factory } from 'nestjs-seeder';
import { UserModel } from '@project/user-module';

@Schema({
  collection: 'balance',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class BalanceModel extends Document implements Balance {
  @Factory((_, ctx: Balance) => ctx.userId)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public userId: string;

  @Factory((_, ctx: Balance) => ctx.trainingId)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  public trainingId: string;

  @Factory((_, ctx: Balance) => ctx.orderId)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
  })
  public orderId: string;

  @Prop({ type: Date })
  public dateStart?: Date;

  @Prop({ type: Date })
  public dateEnd?: Date;

  @Prop({ type: Boolean, default: false })
  public isStarted: boolean;

  @Prop({ type: Boolean, default: false })
  public isFinished: boolean;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceModel);
