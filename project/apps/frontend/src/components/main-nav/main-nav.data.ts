import { AppRoute } from '../../shared/const';

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
    label: 'Friends',
    href: AppRoute.Friends,
    icon: '#icon-friends',
    ariaLabel: 'Друзья',
  },
  {
    label: 'Notifications',
    href: '',
    icon: '#icon-notification',
    ariaLabel: 'Уведомления',
    // notifications: [
    //   {
    //     text: 'Катерина пригласила вас на&nbsp;тренировку',
    //     dateTime: '2023-12-23 12:35',
    //     formattedTime: '23 декабря, 12:35',
    //     isActive: true,
    //   },
    //   {
    //     text: 'Никита отклонил приглашение на&nbsp;совместную тренировку',
    //     dateTime: '2023-12-22 09:22',
    //     formattedTime: '22 декабря, 09:22',
    //     isActive: true,
    //   },
    //   {
    //     text: 'Татьяна добавила вас в&nbsp;друзья',
    //     dateTime: '2023-12-18 18:50',
    //     formattedTime: '18 декабря, 18:50',
    //     isActive: true,
    //   },
    // ],
  },
];
