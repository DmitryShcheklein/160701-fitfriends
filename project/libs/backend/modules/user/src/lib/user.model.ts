import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AuthUser,
  UserGender,
  UserLocation,
  UserRole,
  UserTrainingConfig,
} from '@project/core';
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

  @Prop({
    default: null,
  })
  public avatarPath!: string | null;

  @Prop({
    default: null,
  })
  public backgroundPath!: string | null;

  @Prop({ type: Date })
  public dateOfBirth?: Date;

  @Prop({
    type: String,
    minlength: User.Description.Min,
    maxlength: User.Description.Max,
  })
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
  })
  public location: UserLocation;

  @Prop({
    required: true,
    type: String,
    enum: UserGender,
  })
  public gender: UserGender;

  @Prop({ required: false, default: false })
  public trainingReadiness!: boolean;

  @Prop({ required: true, type: Object })
  public trainingConfig!: UserTrainingConfig;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
