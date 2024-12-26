import { Entity, Friend, StorableEntity } from '@project/core';
import { FriendRequestStatus } from '@project/enums';

export class FriendEntity extends Entity implements StorableEntity<Friend> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public sender: string;
  public recipient: string;
  public status: FriendRequestStatus;

  constructor(data: Friend) {
    super();
    this.populate(data);
  }

  public populate(data: Friend) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.sender = data.sender;
    this.recipient = data.recipient;
    this.status = data.status;
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sender: this.sender,
      recipient: this.recipient,
      status: this.status,
    };
  }
}
