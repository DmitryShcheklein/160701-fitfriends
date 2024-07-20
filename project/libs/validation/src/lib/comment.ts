import TrainingValidation from './training';

export const CommentValidator = {
  Rating: {
    Min: 1,
    Max: TrainingValidation.Rating.Max,
  },
  Message: {
    Min: 100,
    Max: 1024,
  },
};
