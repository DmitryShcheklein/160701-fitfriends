import { AllowedMimetypes, MB } from './const';

export const TrainingValidation = {
  Name: {
    Min: 1,
    Max: 15,
  },
  BackgroundImage: {
    Type: AllowedMimetypes.Img,
    FileMaxSize: 5 * MB,
  },
  Price: {
    Min: 0,
    Max: Infinity,
  },
  Calories: {
    Min: 1000,
    Max: 5000,
  },
  Description: {
    Min: 10,
    Max: 140,
  },
  Video: {
    Type: AllowedMimetypes.Video,
    FileMaxSize: 100 * MB,
  },
  Coach: {
    Min: 1,
    Max: 15,
  },
  Rating: {
    Min: 0,
    Max: 5,
  },
};

export default TrainingValidation;
