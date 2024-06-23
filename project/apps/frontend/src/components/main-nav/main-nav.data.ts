import { AppRoute } from '../../shared/const';
import { logOut } from '../../store/auth-process/auth-process';

export const navItems = [
  {
    label: 'Home',
    href: AppRoute.Index,
    icon: '#icon-home',
    ariaLabel: 'На главную',
  },
  {
    label: 'Profile',
    href: AppRoute.Profile,
    icon: '#icon-user',
    ariaLabel: 'Личный кабинет',
  },
  {
    label: 'Выход',
    href: AppRoute.Intro,
    onClick: () => logOut(),
    icon: '#icon-trash',
    ariaLabel: 'Выход',
  },
];
