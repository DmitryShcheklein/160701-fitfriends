import {
  UserGender,
  WorkoutType,
  FitnessLevel,
  UserLocation,
} from '../../enums';

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

export const locationOptions = [
  { value: UserLocation.Pionerskaya, label: 'Пионерская' },
  { value: UserLocation.Petrogradskaya, label: 'Петроградская' },
  { value: UserLocation.Udelnaya, label: 'Удельная' },
  { value: UserLocation.Zvezdnaya, label: 'Звёздная' },
  { value: UserLocation.Sportivnaya, label: 'Спортивная' },
];

export const genderOptions = [
  { value: UserGender.Female, label: 'Женский' },
  { value: UserGender.Male, label: 'Мужской' },
  { value: UserGender.Any, label: 'Неважно' },
];

export const fitnessLevelOptions = [
  { value: FitnessLevel.Beginner, label: 'Новичок' },
  { value: FitnessLevel.Amateur, label: 'Любитель' },
  { value: FitnessLevel.Professional, label: 'Профессионал' },
];
