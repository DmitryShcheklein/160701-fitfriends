import { Expose } from 'class-transformer';
import { Balance } from '@project/core';

export class BalanceRdo implements Balance {
  @Expose()
  id: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  userId: string;
  @Expose()
  trainingId: string;
  @Expose()
  orderId: string;
  @Expose()
  isActive: boolean;
  @Expose()
  dateStart: Date | null;
  @Expose()
  dateEnd: Date | null;
  @Expose()
  isStarted: boolean;
  @Expose()
  isFinished: boolean;
}
