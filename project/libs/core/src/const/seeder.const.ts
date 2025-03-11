import { AuthUser } from '../interfaces/users/auth-user.interface';
import { UserRole } from '@project/enums';

interface SeedUser extends Pick<AuthUser, 'email' | 'firstName' | 'role'> {
  password: string;
  avatarFileName: string;
}

export const AdminUser: SeedUser = {
  email: 'admin@admin.ru',
  firstName: 'Admin',
  password: 'adminnew',
  avatarFileName: 'admin-avatar.jpg',
  role: UserRole.Admin,
};

export const TrainerUser: SeedUser = {
  email: 'trainer@trainer.ru',
  firstName: 'Trainer',
  password: '123456',
  avatarFileName: 'trainer-avatar.jpg',
  role: UserRole.Trainer,
};
export const MyUser: SeedUser = {
  email: 'user@user.ru',
  password: '123456',
  firstName: 'User',
  avatarFileName: 'default-avatar.png',
  role: UserRole.User,
};

export const RandomUser: Partial<SeedUser> = {
  password: '123456',
  avatarFileName: 'default-avatar.png',
};
