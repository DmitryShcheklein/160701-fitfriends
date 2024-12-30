import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Friend } from '@project/core';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';
import { UserModel } from '@project/user-module';
import { FriendRequestStatus } from '@project/enums';

@Schema({
  collection: 'friends',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class FriendModel extends Document implements Friend {
  @Factory((_, ctx) => fakerRU.helpers.arrayElement(ctx.senderIds))
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public userId: string;

  @Factory((_, ctx) => fakerRU.helpers.arrayElement(ctx.recipientIds))
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  public friendId: string;

  @Prop({
    enum: FriendRequestStatus,
    required: true,
    type: String,
  })
  public status: FriendRequestStatus;
}

export const FriendSchema = SchemaFactory.createForClass(FriendModel);
