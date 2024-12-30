export interface Friend {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  userId: string;
  friendId: string;
}
