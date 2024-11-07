import Popup from '../ui/popup/popup';
import { BuyForm } from '../forms/buy-form/buy-form';
import { useGetTrainingByIdQuery } from '../../store/training-process/training-api';
import {
  genderOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../forms/user-info/user-info.data';
import { useState } from 'react';
import {
  useFinishTrainingMutation,
  useGetByTrainingIdQuery,
  useStartTrainingMutation
} from '../../store/balance-process/balance-api';
import {toast} from "react-toastify";

interface TrainingCardProps {
  trainingId: string;
}

export const TrainingCard = ({ trainingId }: TrainingCardProps) => {
  const { data: training } = useGetTrainingByIdQuery(trainingId);
  const { data: balances } = useGetByTrainingIdQuery(trainingId);
  const [startTraining, {isLoading: isLoadingStartTraining}] = useStartTrainingMutation();
  const [finishTraining, {isLoading: isLoadingFinishTraining}] = useFinishTrainingMutation();

  const isStarted = balances?.some((item) => item.isStarted);
  const canBuy = balances?.every((item) => item.isFinished);
  const [isDisabled, setIsDisabled] = useState(false);

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

  const [showBuyModal, setShowBuyModal] = useState(false);
  const onButtonBuyClick = () => {
    setShowBuyModal(!showBuyModal);
  };

  const startTrainingHandle = async ()=>{
    try {
      await startTraining(trainingId).unwrap();
    } catch (err: any) {
      console.error('Failed to start: ', err);
    }
  }

  const finishTrainingHandle = async ()=>{
    try {
      await finishTraining(trainingId).unwrap();
    } catch (err: any) {
      console.error('Failed to send: ', err);
    }
  }


  return (
    <div className="training-card">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{training?.coach}</span>
            </div>
          </div>
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      {training?.name}
                    </span>
                    <input
                      type="text"
                      name="training"
                      defaultValue={training?.name}
                      disabled
                    />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <textarea
                      name="description"
                      disabled
                      defaultValue={training?.description}
                    />
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      defaultValue={training?.rating}
                      disabled
                    />
                  </label>
                </div>
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
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <input
                      type="text"
                      name="price"
                      defaultValue={`${training?.price} ₽`}
                      disabled
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <button
                  onClick={onButtonBuyClick}
                  className="btn training-info__buy"
                  type="button"
                  disabled={!canBuy || isDisabled}
                >
                  Купить
                </button>
                <Popup
                  isOpen={showBuyModal}
                  title="Купить тренировку"
                  showCloseButton
                  onClose={() => setShowBuyModal(false)}
                >
                  <BuyForm
                    training={training}
                    onSuccess={() => {
                      setShowBuyModal(false);
                      setIsDisabled(true);
                    }}
                  />
                </Popup>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <video src={training?.video} controls={false} loop></video>
          </div>

          {isStarted?(
            <button
              className="training-video__play-button btn-reset"

            >
              <svg width="18" height="30" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          ):null}
        </div>
        <div className="training-video__buttons-wrapper">
          {!isStarted?(
            <button
              className="btn training-video__button training-video__button--start"
              type="button"
              disabled={isStarted || canBuy || isLoadingStartTraining}
              onClick={startTrainingHandle}
            >
              Приступить
            </button>
          ):null}

          {isStarted?(
            <button
              className="btn training-video__button training-video__button--stop"
              type="button"
              onClick={finishTrainingHandle}
            >
              Закончить
            </button>
          ):null}
        </div>
      </div>
    </div>
  );
};
