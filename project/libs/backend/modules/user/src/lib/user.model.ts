import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, UserTrainingConfig } from '@project/core';
import { User } from '@project/validation';
import { UserRole, UserLocation, UserGender } from '@project/enums';
import { Factory } from 'nestjs-seeder';
import { fakerRU } from '@faker-js/faker';

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class UserModel extends Document implements AuthUser {
  @Factory((_, ctx) => ctx.email || fakerRU.internet.email())
  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Factory((_, ctx) => ctx.firstName || fakerRU.person.firstName())
  @Prop({
    required: true,
    minlength: User.FirstName.Min,
    maxlength: User.FirstName.Max,
  })
  public firstName!: string;

  @Factory((_, ctx) => ctx.passwordHash)
  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Factory((faker) => faker.helpers.enumValue(UserGender))
  @Prop({
    required: true,
    type: String,
    enum: UserGender,
  })
  public gender: UserGender;

  @Factory((_, ctx) => {
    if (Array.isArray(ctx.avatarPaths)) {
      if (ctx.gender === UserGender.Male) {
        const maleUsers = ctx.avatarPaths.filter((path: string) =>
          path.includes(UserGender.Male.toLowerCase())
        );
        return fakerRU.helpers.arrayElement(maleUsers);
      }
      if (ctx.gender === UserGender.Female) {
        const femaleUsers = ctx.avatarPaths.filter((path: string) =>
          path.includes(UserGender.Female.toLowerCase())
        );
        return fakerRU.helpers.arrayElement(femaleUsers);
      }

      return null;
    }

    return ctx.avatarPath || null;
  })
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

  @Factory((faker) => faker.helpers.enumValue(UserRole))
  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Factory((faker) => faker.helpers.enumValue(UserLocation))
  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
  })
  public location: UserLocation;

  @Prop({ required: false, type: Object, default: {} })
  public trainingConfig!: UserTrainingConfig;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
