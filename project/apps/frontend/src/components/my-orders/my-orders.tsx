import { TrainingCardMin } from '../training-card-min/training-card-min';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/const';
import { useGetOrdersByTrainerIdQuery } from '../../store/orders-process/orders-api';
import { priceFormatter } from '../../shared/helpers/priceFormatter';

export const MyOrders = () => {
  const { data } = useGetOrdersByTrainerIdQuery({
    limit: 6,
    page: 1,
  });
  const orders = data?.entities;
  console.log(orders);
  return (
    <section className="my-orders">
      <div className="my-orders__wrapper">
        <Link
          to={AppRoute.Profile}
          className="btn-flat btn-flat--underlined my-orders__back"
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </Link>
        <div className="my-orders__title-wrapper">
          <h1 className="my-orders__title">Мои заказы</h1>
          <div className="sort-for" style={{ display: 'none' }}>
            <p>Сортировать по:</p>
            <div className="sort-for__btn-container">
              {[
                { name: 'Сумме' },
                {
                  name: 'Количеству',
                },
              ].map(({ name }) => (
                <button className="btn-filter-sort" type="button" key={name}>
                  <span>{name}</span>
                  <svg width="16" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-sort-up"></use>
                    {/*<use xlinkHref="#icon-sort-down"></use>*/}
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
        <ul className="my-orders__list">
          {orders?.map(({ training, totalCount, totalSum }) => {
            return (
              <TrainingCardMin
                training={training[0]}
                key={training[0]?.id}
                className="my-orders__item"
              >
                <div className="thumbnail-training__total-info">
                  <div className="thumbnail-training__total-info-card">
                    <svg width="32" height="32" aria-hidden="true">
                      <use xlinkHref="#icon-chart"></use>
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      {totalCount}
                    </p>
                    <p className="thumbnail-training__total-info-text">
                      Куплено тренировок
                    </p>
                  </div>
                  <div className="thumbnail-training__total-info-card">
                    <svg width="31" height="28" aria-hidden="true">
                      <use xlinkHref="#icon-wallet"></use>
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      {priceFormatter(totalSum)}
                    </p>
                    <p className="thumbnail-training__total-info-text">
                      Общая сумма
                    </p>
                  </div>
                </div>
              </TrainingCardMin>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
