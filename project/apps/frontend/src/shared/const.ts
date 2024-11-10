const AppRoute = {
  Intro: '/intro',
  Index: '/',
  Login: '/login',
  Register: '/register',
  ErrorPage: '/page404',

  Profile: '/profile',
  Catalog: '/catalog',
  TrainingCardPage: '/training',
  Questionnaire: '/questionnaire',
  Friends: '/friends',
  Purchases: '/purchases',

  Orders: '/orders',
  MyTrainings: '/trainings',
  CreateTraining: '/create-training',
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
