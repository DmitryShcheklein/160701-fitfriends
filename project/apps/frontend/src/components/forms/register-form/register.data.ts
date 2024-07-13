export const roleOptions = [
  {
    value: 'user',
    label: 'Я хочу тренироваться',
    icon: '#icon-weight',
    isReadonly: true,
  },
];

export enum UserLocation {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvezdnaya = 'Звёздная',
  Sportivnaya = 'Спортивная',
}

export const locationOptions = Object.entries(UserLocation).map(
  ([value, label]) => ({
    value,
    label,
  })
);
