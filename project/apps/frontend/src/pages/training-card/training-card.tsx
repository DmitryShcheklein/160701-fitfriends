import { Helmet } from 'react-helmet-async';
import { AppRoute, PageTitles } from '../../shared/const';
import { Sidebar } from '../../components/base/sidebar/sidebar';
import { Link, useParams } from 'react-router-dom';
import { useGetTrainingByIdQuery } from '../../store/training-process/training-api';
import { LoaderPage } from '../../components/loaders/loader-page/loader-page';

const TrainingCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: training, isLoading } = useGetTrainingByIdQuery(String(id));

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
          <div className="training-video" style={{ display: 'none' }}>
            <h2 className="training-video__title">Видео</h2>
            <div className="training-video__video">
              <div className="training-video__thumbnail">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
                  />
                  <img
                    src="img/content/training-video/video-thumbnail.png"
                    srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                    width="922"
                    height="566"
                    alt="Обложка видео"
                  />
                </picture>
              </div>
              <button className="training-video__play-button btn-reset">
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
