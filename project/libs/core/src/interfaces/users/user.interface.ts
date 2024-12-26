import { UserRole, UserLocation, UserGender } from '@project/enums';
import { UserTrainingConfig } from './user-training-config.interface';

export interface User {
  id?: string;
  createdAt?: Date;
  dateOfBirth?: Date;
  email: string;
  firstName: string;
  description?: string;
  avatarPath: string | null;
  backgroundPath?: string | null;
  role: UserRole;
  location: UserLocation;
  gender: UserGender;
  trainingConfig?: UserTrainingConfig | null;
  friends?: string[];
}
