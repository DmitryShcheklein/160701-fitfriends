import { ALLOWED_IMG_MIMETYPES, MB } from './const';

export const User = {
  Firstname: {
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
    Type: ALLOWED_IMG_MIMETYPES,
    FileMaxSize: 1 * MB,
  },
  PageBackground: {
    Type: ALLOWED_IMG_MIMETYPES,
    FileMaxSize: 1 * MB,
  },
  CaloriesWantLost: {
    Min: 1000,
    Max: 5000,
  },
  CaloriesPerDay: {
    Min: 1000,
    Max: 5000,
  },
};
