const AppRoute = {
  Root: '/',
  Login: '/login',
  Register: '/regiser',
  Main: '/main',
  ErrorPage: '/page404',
} as const;

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum PageTitles {
  Root = 'Разводящая — FitFriends',
  Login = 'Войти — FitFriends',
  Register = 'Регистрация — FitFriends',
  Page404 = 'Страница 404 — FitFriends',
}

export { AppRoute, AuthStatus, PageTitles };
