const AppRoute = {
  Intro: '/intro',
  Index: '/',
  Login: '/login',
  Register: '/regiser',
  Profile: '/profile',
  Friends: '/friends',
  ErrorPage: '/page404',
} as const;

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum PageTitles {
  Intro = 'Разводящая — FitFriends',
  Index = 'Главная — FitFriends',
  Login = 'Войти — FitFriends',
  Register = 'Регистрация — FitFriends',
  Page404 = 'Страница 404 — FitFriends',
}

export { AppRoute, AuthStatus, PageTitles };
