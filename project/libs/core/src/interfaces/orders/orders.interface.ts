export interface Order {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  type: string;
  userId: string;
  trainingId: string;
  trainingPrice: number;
  quantity: number;
  totalSum: number;
  paymentType: string;
}
