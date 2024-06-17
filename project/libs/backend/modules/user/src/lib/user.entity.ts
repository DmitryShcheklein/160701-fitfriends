import {
  AuthUser,
  Entity,
  StorableEntity,
  UserGender,
  UserLocation,
  UserRole,
} from '@project/core';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public createdAt?: Date;
  public dateOfBirth?: Date;
  public email!: string;
  public firstname!: string;
  public description!: string;
  public passwordHash!: string;
  public avatarPath!: string;
  public backgroundPath!: string;
  public role!: UserRole;
  public location!: UserLocation;
  public gender!: UserGender;
  public trainingReadiness!: boolean;

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
    this.firstname = user.firstname;
    this.description = user.description;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.dateOfBirth = user.dateOfBirth;
    this.avatarPath = user.avatarPath;
    this.backgroundPath = user.backgroundPath;
    this.role = user.role;
    this.location = user.location;
    this.gender = user.gender;
    this.trainingReadiness = user.trainingReadiness;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      description: this.description,
      createdAt: this.createdAt,
      dateOfBirth: this.dateOfBirth,
      passwordHash: this.passwordHash,
      avatarPath: this.avatarPath,
      backgroundPath: this.backgroundPath,
      role: this.role,
      location: this.location,
      gender: this.gender,
      trainingReadiness: this.trainingReadiness,
    };
  }

  public setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;

    return this;
  }
}
