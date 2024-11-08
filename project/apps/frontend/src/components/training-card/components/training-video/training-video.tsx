import {
  useFinishTrainingMutation,
  useGetByTrainingIdQuery,
  useStartTrainingMutation,
} from '../../../../store/balance-process/balance-api';
import { TrainingRdo } from '@project/rdo';

interface TrainingVideoProps {
  trainingId: string;
  training?: TrainingRdo;
}

export const TrainingVideo = ({ training, trainingId }: TrainingVideoProps) => {
  const { data: balances } = useGetByTrainingIdQuery(trainingId);
  const isStarted = balances?.some((item) => item.isStarted);
  const canBuy = balances?.every((item) => item.isFinished);

  const [startTraining, { isLoading: isLoadingStartTraining }] =
    useStartTrainingMutation();
  const [finishTraining, { isLoading: isLoadingFinishTraining }] =
    useFinishTrainingMutation();

  const startTrainingHandle = async () => {
    try {
      await startTraining(trainingId).unwrap();
    } catch (err: any) {
      console.error('Failed to start: ', err);
    }
  };

  const finishTrainingHandle = async () => {
    try {
      await finishTraining(trainingId).unwrap();
    } catch (err: any) {
      console.error('Failed to send: ', err);
    }
  };

  return (
    <>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          <video src={training?.video} controls={false} loop></video>
        </div>

        {isStarted ? (
          <button className="training-video__play-button btn-reset">
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        ) : null}
      </div>
      <div className="training-video__buttons-wrapper">
        {!isStarted ? (
          <button
            className="btn training-video__button training-video__button--start"
            type="button"
            disabled={isStarted || canBuy || isLoadingStartTraining}
            onClick={startTrainingHandle}
          >
            Приступить
          </button>
        ) : null}

        {isStarted ? (
          <button
            className="btn training-video__button training-video__button--stop"
            type="button"
            disabled={isLoadingFinishTraining}
            onClick={finishTrainingHandle}
          >
            Закончить
          </button>
        ) : null}
      </div>
    </>
  );
};
