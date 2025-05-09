import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, UserTrainingConfig } from '@project/core';
import { UserValidation } from '@project/validation';
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

  @Factory((_, ctx) => ctx.passwordHash)
  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Factory((_, ctx) => ctx.role || UserRole.User)
  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Factory((faker) =>
    faker.helpers.arrayElement([UserGender.Male, UserGender.Female])
  )
  @Prop({
    required: true,
    type: String,
    enum: UserGender,
  })
  public gender: UserGender;

  @Factory((_, ctx) => {
    if (ctx.firstName) {
      return ctx.firstName;
    }
    if (ctx.gender === UserGender.Male || ctx.gender === UserGender.Female) {
      return fakerRU.person.firstName(ctx.gender);
    }

    return fakerRU.person.firstName();
  })
  @Prop({
    required: true,
    minlength: UserValidation.FirstName.Min,
    maxlength: UserValidation.FirstName.Max,
  })
  public firstName!: string;

  @Factory((_, ctx) => {
    if (Array.isArray(ctx.avatarPaths)) {
      if (ctx.gender === UserGender.Male || ctx.gender === UserGender.Female) {
        const avatarPaths = ctx.avatarPaths
          .filter((obj) => obj.gender === ctx.gender)
          .map((el) => el.path);

        return fakerRU.helpers.arrayElement(avatarPaths);
      }
      if (ctx.gender === UserGender.Any) {
        return ctx.defaultAvatar;
      }
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

  @Factory(() =>
    fakerRU.lorem
      .sentence({
        min: UserValidation.Description.Min,
        max: UserValidation.Description.Max,
      })
      .substring(0, UserValidation.Description.Max)
  )
  @Prop({
    type: String,
    minlength: UserValidation.Description.Min,
    maxlength: UserValidation.Description.Max,
  })
  public description: string;

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
