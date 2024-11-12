import { AuthUser } from '../users/auth-user.interface';
import { UserGender } from '@project/enums';

export interface UsersSeederData extends Pick<AuthUser, 'passwordHash'> {
  passwordHash: string;
  avatarPaths: { gender: UserGender; path: string }[];
  defaultAvatar: string;
}
