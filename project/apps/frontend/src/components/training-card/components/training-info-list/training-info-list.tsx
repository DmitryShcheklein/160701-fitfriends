import {
  genderOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../../../shared/data';
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
  const data = [
    trainingType,
    genderType,
    `${training?.calories}ккал`,
    workoutDuration,
  ];

  return (
    <ul className="training-info__list">
      {data.map((el) => (
        <li className="training-info__item" key={el}>
          <div className="hashtag hashtag--white">
            <span>#{el}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
