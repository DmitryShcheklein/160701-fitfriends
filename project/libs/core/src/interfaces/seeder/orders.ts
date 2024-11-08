import { Order } from '../orders/orders.interface';
import { Training } from '../trainings/training.interface';

export interface OrderSeeder extends Omit<Order, 'trainingId'> {
  training: Training;
}
