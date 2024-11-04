import { Expose } from 'class-transformer';
import { Balance } from '@project/core';

export class BalanceRdo implements Balance {
  @Expose()
  id: string;
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  trainingId: string;
  orderId: string;
  @Expose()
  isActive: boolean;

  dateStart: Date | null;
  dateEnd: Date | null;
  isStarted: boolean;
  isFinished: boolean;
}
