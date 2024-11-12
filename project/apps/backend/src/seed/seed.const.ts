import { AuthUser } from '@project/core';

interface SeedUser extends Pick<AuthUser, 'email' | 'firstName'> {
  password: string;
  avatarFileName: string;
}

export const AdminUser: SeedUser = {
  email: 'admin@admin.ru',
  firstName: 'Admin',
  password: 'adminnew',
  avatarFileName: 'admin-avatar.jpg',
};

export const User: Partial<SeedUser> = {
  password: '123456',
};

export const DEFAULT_AVATAR_FILE_NAME = `default-avatar.png`;
