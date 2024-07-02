import { AppRoute } from '../../shared/const';
import { store } from '../../store';
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
    label: 'Q',
    href: AppRoute.Questionnaire,
    icon: '#icon-book',
    ariaLabel: 'Опросник',
  },
  {
    label: 'Выход',
    href: AppRoute.Intro,
    onClick: () => store.dispatch(logOut()),
    icon: '#icon-trash',
    ariaLabel: 'Выход',
  },
];
