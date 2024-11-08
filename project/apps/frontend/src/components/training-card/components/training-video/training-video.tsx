import {
  useFinishTrainingMutation,
  useGetByTrainingIdQuery,
  useStartTrainingMutation,
} from '../../../../store/balance-process/balance-api';
import { TrainingRdo } from '@project/rdo';
import { useRef } from 'react';

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
      videoRef.current?.pause();
      await finishTraining(trainingId).unwrap();
    } catch (err: any) {
      console.error('Failed to send: ', err);
    }
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const playBtnHandler = () => {
    videoRef.current?.play();
  };

  return (
    <>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          <video ref={videoRef} src={training?.video} controls={false}></video>
        </div>

        {isStarted ? (
          <button
            className="training-video__play-button btn-reset"
            onClick={playBtnHandler}
          >
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
