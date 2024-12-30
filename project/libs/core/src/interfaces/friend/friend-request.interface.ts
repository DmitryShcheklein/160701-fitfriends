import { FriendRequestStatus } from '@project/enums';

export interface FriendRequest {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  sender: string;
  recipient: string;
  status: FriendRequestStatus;
}
