enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const AppRoute = {
  Intro: '/intro',
  Index: '/',
  Login: '/login',
  Register: '/register',
  Page404: '/page404',

  Profile: '/profile',
  Catalog: '/catalog',
  TrainingCardPage: '/training',
  Questionnaire: '/questionnaire',
  Friends: '/friends',
  MyPurchases: '/my-purchases',

  MyOrders: '/orders',
  MyTrainings: '/trainings',
  CreateTraining: '/create-training',
} as const;

const PageTitles: Record<keyof typeof AppRoute, string> = {
  Intro: 'Разводящая',
  Index: 'Главная',
  Login: 'Войти',
  Register: 'Регистрация',
  Page404: 'Страница 404',

  Profile: 'Личный кабинет',
  Catalog: 'Мои тренировки',
  TrainingCardPage: 'Карточка тренировки',
  Questionnaire: 'Опросник',
  Friends: 'Список друзей',
  MyPurchases: 'Мои покупки',

  MyOrders: 'Мои заказы',
  MyTrainings: 'Мои тренировки',
  CreateTraining: 'Создать тренировку',
};

function getPageTitle(route: keyof typeof AppRoute): string {
  return `${PageTitles[route]}  — FitFriends`;
}

export { AppRoute, AuthStatus, PageTitles, getPageTitle };
