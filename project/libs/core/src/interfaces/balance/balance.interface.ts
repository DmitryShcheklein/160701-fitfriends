export interface Balance {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  userId: string;
  trainingId: string;
  orderId: string;

  dateStart?: Date;
  dateEnd?: Date;
  isStarted?: boolean;
  isFinished?: boolean;
}
