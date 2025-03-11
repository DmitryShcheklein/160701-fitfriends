import { Entity, Friend, StorableEntity } from '@project/core';

export class FriendEntity extends Entity implements StorableEntity<Friend> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public userId: string;
  public friendId: string;

  constructor(data: Friend) {
    super();
    this.populate(data);
  }

  public populate(data: Friend) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    this.userId = data.userId;
    this.friendId = data.friendId;
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      userId: this.userId,
      friendId: this.friendId,
    };
  }
}
