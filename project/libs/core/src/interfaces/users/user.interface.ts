import { UserGender } from '../../enums/user/user-gender.enum';
import { UserLocation } from '../../enums/user/user-location.enum';
import { UserRole } from '../../enums/user/user-role.enum';

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
  trainingReadiness: boolean;
}
