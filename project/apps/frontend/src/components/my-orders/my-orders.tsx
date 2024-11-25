import { TrainingCardMin } from '../training-card-min/training-card-min';
import { useGetTrainingsQuery } from '../../store/training-process/training-api';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/const';
import { useGetCurrentUserQuery } from '../../store/user-process/user-api';
import { useGetOrdersByTrainingsIdsQuery } from '../../store/orders-process/orders-api';

export const MyOrders = () => {
  const { data: user } = useGetCurrentUserQuery();

  const { data } = useGetTrainingsQuery({
    limit: 6,
    page: 1,
    trainerId: user?.id,
  });
  const items = data?.entities;

  const { data: orders } = useGetOrdersByTrainingsIdsQuery(
    items?.map((training) => training.id, { skip: !items.length })
  );
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
          {items?.map((training) => {
            const currentTrainings = orders?.filter(
              (order) => order.trainingId === training.id
            );

            return (
              <TrainingCardMin
                training={training}
                key={training.id}
                className="my-orders__item"
              >
                <div className="thumbnail-training__total-info">
                  <div className="thumbnail-training__total-info-card">
                    <svg width="32" height="32" aria-hidden="true">
                      <use xlinkHref="#icon-chart"></use>
                    </svg>
                    <p className="thumbnail-training__total-info-value">
                      {currentTrainings?.reduce(
                        (acc, current) => (acc += current.quantity),
                        0
                      )}
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
                      {currentTrainings?.reduce(
                        (acc, current) => (acc += current.totalSum),
                        0
                      )}

                      <span>₽</span>
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
