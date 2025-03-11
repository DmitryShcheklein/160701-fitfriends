const AuthStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

const AppRoute = {
  Intro: '/intro',
  Index: '/',
  Login: '/login',
  Register: '/register',
  Page404: '/page404',
  Page403: '/page403',

  UserCard: '/user-card',
  Profile: '/profile',
  Catalog: '/catalog',
  UsersCatalog: '/users-catalog',
  TrainingCardPage: '/training',
  QuestionnaireUser: '/questionnaire-user',
  QuestionnaireTrainer: '/questionnaire-trainer',
  Friends: '/friends',
  MyPurchases: '/my-purchases',

  MyOrders: '/my-orders',
  MyTrainings: '/my-trainings',
  CreateTraining: '/create-training',
} as const;

const PageTitles: Record<keyof typeof AppRoute, string> = {
  Intro: 'Разводящая',
  Index: 'Главная',
  Login: 'Войти',
  Register: 'Регистрация',
  Page404: 'Страница 404',
  Page403: 'Страница 403',

  UserCard: 'Карточка пользователя',
  Profile: 'Личный кабинет',
  Catalog: 'Мои тренировки',
  UsersCatalog: 'Каталог пользователей',
  TrainingCardPage: 'Карточка тренировки',
  QuestionnaireUser: 'Опросник тренер',
  QuestionnaireTrainer: 'Опросник тренер',
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
