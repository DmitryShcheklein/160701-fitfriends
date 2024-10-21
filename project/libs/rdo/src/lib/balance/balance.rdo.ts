import { AvailableTraining, Balance } from '@project/core';
import { Expose } from 'class-transformer';

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

  @Expose()
  availableTrainings: AvailableTraining[];
}
