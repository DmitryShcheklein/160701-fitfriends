import { AppRoute } from '../../shared/const';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../../shared/helpers/priceFormatter';
import { specializationOptions } from '../forms/user-info/user-info.data';
import { useGetOrdersQuery } from '../../store/orders-process/orders-api';
import { LoaderPage } from '../loaders/loader-page/loader-page';
import { useState } from 'react';

export const Purchases = () => {
  const [onlyActive, setOnlyActive] = useState(false);
  const { data, isLoading } = useGetOrdersQuery({
    isActive: onlyActive,
  });

  const orders = data?.entities;

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <section className="my-purchases">
      <div className="my-purchases__wrapper">
        <Link to={AppRoute.Profile} className="btn-flat my-purchases__back">
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </Link>

        <div className="my-purchases__title-wrapper">
          <h1 className="my-purchases__title">Мои покупки</h1>
          <div className="my-purchases__controls">
            <div
              className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
              data-validate-type="checkbox"
            >
              <label>
                <input
                  onChange={() => setOnlyActive(!onlyActive)}
                  type="checkbox"
                  value="user-agreement-1"
                  name="user-agreement"
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Только активные</span>
              </label>
            </div>
          </div>
        </div>
        <ul className="my-purchases__list">
          {orders?.map(({ id, trainingPrice, trainingId }) => {
            return (
              <li className="my-purchases__item" key={id}>
                <div className="thumbnail-training">
                  <div className="thumbnail-training__inner">
                    <div className="thumbnail-training__image">
                      <picture>
                        <img
                          src={trainingId?.backgroundImage}
                          width="330"
                          height="190"
                          alt={trainingId.name}
                        />
                      </picture>
                    </div>
                    <p className="thumbnail-training__price">
                      <span className="thumbnail-training__price-value">
                        {priceFormatter(trainingPrice)}
                      </span>
                      <span>₽</span>
                    </p>
                    <h2 className="thumbnail-training__title">
                      {trainingId?.name}
                    </h2>
                    <div className="thumbnail-training__info">
                      <ul className="thumbnail-training__hashtags-list">
                        <li className="thumbnail-training__hashtags-item">
                          <div className="hashtag thumbnail-training__hashtag">
                            <span>
                              #
                              {specializationOptions
                                .find(
                                  (item) =>
                                    item.value === trainingId?.trainingType
                                )
                                ?.label.toLowerCase()}
                            </span>
                          </div>
                        </li>
                        <li className="thumbnail-training__hashtags-item">
                          <div className="hashtag thumbnail-training__hashtag">
                            <span>#{trainingId?.calories}ккал</span>
                          </div>
                        </li>
                      </ul>
                      <div className="thumbnail-training__rate">
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <span className="thumbnail-training__rate-value">
                          {trainingId?.rating}
                        </span>
                      </div>
                    </div>
                    <div className="thumbnail-training__text-wrapper">
                      <p className="thumbnail-training__text">
                        {trainingId?.description}
                      </p>
                    </div>
                    <div className="thumbnail-training__button-wrapper">
                      <Link
                        to={`${AppRoute.TrainingCardPage}/${trainingId?.id}`}
                        className="btn btn--small thumbnail-training__button-catalog"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="show-more my-purchases__show-more">
          {/* className="btn show-more__button show-more__button--to-top" */}
          <button
            className="btn show-more__button show-more__button--more"
            type="button"
          >
            Показать еще
            {/*  Вернуться в начало*/}
          </button>
        </div>
      </div>
    </section>
  );
};
