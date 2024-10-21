import { AvailableTraining, Balance } from '@project/core';

export class BalanceRdo implements Balance {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  trainingId: string;
  orderId: string;
  isActive: boolean;
  availableTrainings: AvailableTraining[];
}
