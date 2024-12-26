import { FriendRequestStatus } from '@project/enums';

export interface Friend {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  sender: string;
  recipient: string;
  status: FriendRequestStatus;
}
