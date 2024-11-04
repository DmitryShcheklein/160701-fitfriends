export interface Balance {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  userId: string;
  trainingId: string;
  orderId: string;
  isActive?: boolean;

  dateStart?: Date;
  dateEnd?: Date;
  isStarted?: boolean;
  isFinished?: boolean;
}
