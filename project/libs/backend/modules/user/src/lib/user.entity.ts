import { AuthUser, Entity, StorableEntity } from '@project/core';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public createdAt?: Date;
  public email!: string;
  public firstname!: string;
  public passwordHash!: string;
  public avatarPath!: string;

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
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.passwordHash = user.passwordHash;
    this.avatarPath = user.avatarPath;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      createdAt: this.createdAt,
      passwordHash: this.passwordHash,
      avatarPath: this.avatarPath,
    };
  }

  public setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;

    return this;
  }
}
