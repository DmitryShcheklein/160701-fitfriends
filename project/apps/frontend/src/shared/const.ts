const AppRoute = {
  Intro: '/intro',
  Index: '/',
  Login: '/login',
  Register: '/register',
  Profile: '/profile',
  Purchases: '/purchases',
  Friends: '/friends',
  Questionnaire: '/questionnaire',
  Catalog: '/catalog',
  TrainingCardPage: '/training',
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
  Purchases = 'Мои покупки — FitFriends',
  Questionnaire = 'Опросник — FitFriends',
  Catalog = 'Мои тренировки — FitFriends',
  TrainingCardPage = 'Карточка тренировки — FitFriends',
}

export { AppRoute, AuthStatus, PageTitles };
