import {
  AuthUser,
  Entity,
  StorableEntity,
  UserTrainingConfig,
} from '@project/core';
import { UserRole, UserLocation, UserGender } from '@project/enums';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public createdAt?: Date;
  public dateOfBirth?: Date;
  public email!: string;
  public firstName!: string;
  public description!: string;
  public passwordHash!: string;
  public avatarPath!: string;
  public backgroundPath!: string;
  public role!: UserRole;
  public location!: UserLocation;
  public gender!: UserGender;
  public trainingConfig!: UserTrainingConfig;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser) {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstName = user.firstName;
    this.description = user.description;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.dateOfBirth = user.dateOfBirth;
    this.avatarPath = user.avatarPath;
    this.backgroundPath = user.backgroundPath;
    this.role = user.role;
    this.location = user.location;
    this.gender = user.gender;
    this.trainingConfig = user.trainingConfig;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      description: this.description,
      createdAt: this.createdAt,
      dateOfBirth: this.dateOfBirth,
      passwordHash: this.passwordHash,
      avatarPath: this.avatarPath,
      backgroundPath: this.backgroundPath,
      role: this.role,
      location: this.location,
      gender: this.gender,
      trainingConfig: this.trainingConfig,
    };
  }

  public setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;

    return this;
  }
}
