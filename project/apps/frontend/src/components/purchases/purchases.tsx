import { AppRoute } from '../../shared/const';
import { Link } from 'react-router-dom';

import { useGetOrdersQuery } from '../../store/orders-process/orders-api';
import { LoaderPage } from '../loaders/loader-page/loader-page';
import { useEffect, useState } from 'react';
import { OrdersQuery } from '@project/core';
import { OrdersWithPaginationRdo } from '@project/rdo';
import { TrainingCardMin } from '../training-card-min/training-card-min';

export const Purchases = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<OrdersQuery>({
    isActive: false,
  });
  const { data, isLoading } = useGetOrdersQuery({
    limit: 6,
    page: currentPage,
    ...filter,
  });

  const [items, setItems] = useState<OrdersWithPaginationRdo['entities']>([]);

  useEffect(() => {
    if (data?.entities) {
      setItems((prev) => [...prev, ...data.entities]);
    }
  }, [data]);

  const handleShowMore = () => {
    if (currentPage < Number(data?.totalPages)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleToTop = () => {
    setCurrentPage(1);
    setItems([]);
  };

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
                  onChange={() => {
                    setCurrentPage(1);
                    setItems([]);
                    setFilter({
                      isActive: !filter.isActive,
                    });
                  }}
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
        {!items.length ? <h3 className="">Список покупок пуст</h3> : null}
        {items.length ? (
          <>
            <ul className="my-purchases__list">
              {items?.map((item) => (
                <TrainingCardMin
                  key={item.trainingId.id}
                  training={item.trainingId}
                  className="my-purchases__item"
                />
              ))}
            </ul>

            {data?.totalPages !== 1 ? (
              <div className="show-more my-purchases__show-more">
                {currentPage < Number(data?.totalPages) ? (
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={handleShowMore}
                  >
                    Показать еще
                  </button>
                ) : (
                  <button
                    className="btn show-more__button show-more__button--to-top"
                    type="button"
                    onClick={handleToTop}
                  >
                    Вернуться в начало
                  </button>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
};
