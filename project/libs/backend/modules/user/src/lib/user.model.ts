import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/core';
import { User } from '@project/validation';

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
    minlength: User.Firstname.Min,
    maxlength: User.Firstname.Max,
  })
  public firstname!: string;

  @Prop({
    required: true,
  })
  public passwordHash!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
