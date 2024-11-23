import { AllowedMimetypes, MB } from './const';

export const UserValidation = {
  FirstName: {
    Min: 1,
    Max: 15,
  },
  Password: {
    Min: 6,
    Max: 12,
  },
  Description: {
    Min: 10,
    Max: 140,
  },
  Avatar: {
    Type: AllowedMimetypes.Img,
    FileMaxSize: 1 * MB,
  },
  PageBackground: {
    Type: AllowedMimetypes.Img,
    FileMaxSize: 1 * MB,
  },
  TrainingConfig: {
    Specialisation: {
      MaxLength: 3,
    },
    CaloriesWantLost: {
      Min: 1000,
      Max: 5000,
    },
    CaloriesPerDay: {
      Min: 1000,
      Max: 5000,
    },
  },
};
