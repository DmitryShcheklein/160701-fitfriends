import { FriendRequest } from '@project/core';
import { FriendRequestStatus } from '@project/enums';

export class FriendRequestRdo implements FriendRequest {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;

  public sender: string;
  public recipient: string;
  public status: FriendRequestStatus;
}
