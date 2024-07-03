import { UserRole, UserLocation, UserGender } from '@project/enums';
import { UserTrainingConfig } from './user-training-config.interface';

export interface User {
  id?: string;
  createdAt?: Date;
  dateOfBirth?: Date;
  email: string;
  firstname: string;
  description?: string;
  avatarPath: string | null;
  backgroundPath?: string | null;
  role: UserRole;
  location: UserLocation;
  gender: UserGender;
  trainingConfig?: Partial<UserTrainingConfig> | null;
}
