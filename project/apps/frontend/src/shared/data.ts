import {
  UserGender,
  WorkoutType,
  FitnessLevel,
  WorkoutDuration,
  UserLocation,
  UserRole,
} from '@project/enums';

export const roleOptions = [
  {
    value: UserRole.Trainer,
    label: 'Я хочу тренировать',
    icon: '#icon-cup',
  },
  {
    value: UserRole.User,
    label: 'Я хочу тренироваться',
    icon: '#icon-weight',
  },
];

export const locationOptions = [
  { value: UserLocation.Pionerskaya, label: 'Пионерская' },
  { value: UserLocation.Petrogradskaya, label: 'Петроградская' },
  { value: UserLocation.Udelnaya, label: 'Удельная' },
  { value: UserLocation.Zvezdnaya, label: 'Звёздная' },
  { value: UserLocation.Sportivnaya, label: 'Спортивная' },
];
export const specializationOptions = [
  { value: WorkoutType.Yoga, label: 'Йога' },
  { value: WorkoutType.Running, label: 'Бег' },
  { value: WorkoutType.Aerobics, label: 'Аэробика' },
  { value: WorkoutType.Boxing, label: 'Бокс' },
  { value: WorkoutType.Power, label: 'Силовые' },
  { value: WorkoutType.Pilates, label: 'Пилатес' },
  { value: WorkoutType.Stretching, label: 'Стрейчинг' },
  { value: WorkoutType.CrossFit, label: 'Кроссфит' },
];

export const genderOptions = [
  { value: UserGender.Female, label: 'Женский', labelV2: 'Женщинам' },
  { value: UserGender.Male, label: 'Мужской', labelV2: 'Мужчинам' },
  { value: UserGender.Any, label: 'Неважно', labelV2: 'Всем' },
];

export const fitnessLevelOptions = [
  { value: FitnessLevel.Beginner, label: 'Новичок' },
  { value: FitnessLevel.Amateur, label: 'Любитель' },
  { value: FitnessLevel.Professional, label: 'Профессионал' },
];

export const workoutDurationOptions = [
  { value: WorkoutDuration.Min10to30, label: '10-30 мин' },
  { value: WorkoutDuration.Min30to50, label: '30-50 мин' },
  { value: WorkoutDuration.Min50to80, label: '50-80 мин' },
  { value: WorkoutDuration.Min80to100, label: '80-100 мин' },
];
