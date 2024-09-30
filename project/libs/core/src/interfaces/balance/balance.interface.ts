import { AvailableTraining } from './available-training.interface';

export interface Balance {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  userId: string;
  trainingId: string;
  orderId: string;
  isActive: boolean;
  availableTrainings: AvailableTraining[];
}
