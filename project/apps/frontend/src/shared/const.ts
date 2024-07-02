const AppRoute = {
  Intro: '/intro',
  Index: '/',
  Login: '/login',
  Register: '/regiser',
  Profile: '/profile',
  Friends: '/friends',
  Questionnaire: '/questionnaire',
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
  Profile = 'Личный кабинет — FitFriends',
  Questionnaire = 'Опросник — FitFriends',
}

export { AppRoute, AuthStatus, PageTitles };
