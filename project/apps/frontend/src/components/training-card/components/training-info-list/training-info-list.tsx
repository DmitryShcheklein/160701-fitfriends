import {
  genderOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../../forms/user-info/user-info.data';
import { TrainingRdo } from '@project/rdo';

interface TrainingInfoListProps {
  training?: TrainingRdo;
}
export const TrainingInfoList = ({ training }: TrainingInfoListProps) => {
  const trainingType = specializationOptions
    .find((el) => el.value === training?.trainingType)
    ?.label?.toLowerCase();
  const genderType = genderOptions
    .find((el) => el.value === training?.gender)
    ?.label?.toLowerCase();
  const workoutDuration = workoutDurationOptions
    .find((el) => el.value === training?.duration)
    ?.label.replace('-', '_')
    .replace(' мин', 'минут');

  return (
    <ul className="training-info__list">
      <li className="training-info__item">
        <div className="hashtag hashtag--white">
          <span>#{trainingType}</span>
        </div>
      </li>
      <li className="training-info__item">
        <div className="hashtag hashtag--white">
          <span>#{genderType}</span>
        </div>
      </li>
      <li className="training-info__item">
        <div className="hashtag hashtag--white">
          <span>#{training?.calories}ккал</span>
        </div>
      </li>
      <li className="training-info__item">
        <div className="hashtag hashtag--white">
          <span>#{workoutDuration}</span>
        </div>
      </li>
    </ul>
  );
};
