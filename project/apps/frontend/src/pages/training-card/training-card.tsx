import { Helmet } from 'react-helmet-async';
import { AppRoute, PageTitles } from '../../shared/const';
import { Sidebar } from '../../components/base/sidebar/sidebar';
import { Link, useParams } from 'react-router-dom';
import { useGetTrainingByIdQuery } from '../../store/training-process/training-api';
import { useGetCommentsByTrainingIdQuery } from '../../store/comments-process/comments-api';
import { LoaderPage } from '../../components/loaders/loader-page/loader-page';
import {
  specializationOptions,
  genderOptions,
  workoutDurationOptions,
} from '../../components/forms/user-info/user-info.data';
import Popup from '../../components/ui/popup/popup';
import { useState } from 'react';
import ReviewForm from '../../components/forms/review-form/review-form';

const TrainingCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: comments } = useGetCommentsByTrainingIdQuery(String(id));
  const { data: training, isLoading } = useGetTrainingByIdQuery(String(id));

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

  const [showReviewModal, setShowReviewModal] = useState(false);

  if (isLoading) return <LoaderPage />;

  return (
    <>
      <Helmet>
        <title>{PageTitles.TrainingCardPage}</title>
      </Helmet>

      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Карточка тренировки</h1>
        <Sidebar>
          <Link
            to={AppRoute.Catalog}
            className="btn-flat btn-flat--underlined reviews-side-bar__back"
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
            <span>Назад</span>
          </Link>
          {comments?.length ? (
            <>
              <h2 className="reviews-side-bar__title">Отзывы</h2>
              <ul className="reviews-side-bar__list">
                {comments.map(({ id, message, rating, user }) => {
                  return (
                    <li className="reviews-side-bar__item" key={id}>
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <img
                                src={user.avatarPath ?? ''}
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">
                            {user.firstName}
                          </span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>{rating}</span>
                          </div>
                        </div>
                        <p className="review__comment">{message}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}

          <button
            className="btn btn--medium reviews-side-bar__button"
            type="button"
            onClick={() => setShowReviewModal(true)}
          >
            Оставить отзыв
          </button>
          <Popup
            className="popup-form--feedback"
            isOpen={showReviewModal}
            title="Оставить отзыв"
            showCloseButton
            onClose={() => setShowReviewModal(false)}
          >
            <ReviewForm />
          </Popup>
        </Sidebar>
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
                      <div className="training-info__error">
                        Обязательное поле
                      </div>
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
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="training-video">
            <h2 className="training-video__title">Видео</h2>
            <div className="training-video__video">
              <div className="training-video__thumbnail">
                <video src={training?.video} controls loop></video>
              </div>
              <button
                className="training-video__play-button btn-reset"
                style={{ display: 'none' }}
              >
                <svg width="18" height="30" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </div>
            <div className="training-video__buttons-wrapper">
              <button
                className="btn training-video__button training-video__button--start"
                type="button"
                disabled
              >
                Приступить
              </button>
              <button
                className="btn training-video__button training-video__button--stop"
                type="button"
              >
                Закончить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingCardPage;
