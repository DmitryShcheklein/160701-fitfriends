import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';

export interface Training {
  id?: string;
  createdAt?: Date;
  name: string;
  backgroundImage?: string;
  level: FitnessLevel;
  trainingType: WorkoutType;
  duration: WorkoutDuration;
  price: number;
  calories: number;
  description: string;
  gender: UserGender;
  video: string;
  rating?: number;
  trainerId: string;
  specialOffer?: boolean;
}
