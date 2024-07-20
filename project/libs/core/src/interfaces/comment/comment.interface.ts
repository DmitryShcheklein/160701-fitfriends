export interface Comment {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  message: string;
  rating: number;
  trainingId: string;
  userId: string;
}
