import { useGetTrainingByIdQuery } from '../../store/training-process/training-api';

import { TrainingBuy } from './components/training-buy/training-buy';
import { TrainingVideo } from './components/training-video/training-video';
import { TrainingInfoList } from './components/training-info-list/training-info-list';

interface TrainingCardProps {
  trainingId: string;
}

export const TrainingCard = ({ trainingId }: TrainingCardProps) => {
  const { data: training } = useGetTrainingByIdQuery(trainingId);

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
                <TrainingInfoList training={training} />
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

                <TrainingBuy training={training} trainingId={trainingId} />
              </div>
            </div>
          </form>
        </div>
      </div>

      <TrainingVideo training={training} trainingId={trainingId} />
    </div>
  );
};
