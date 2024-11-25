import { Helmet } from 'react-helmet-async';
import { AppRoute, getPageTitle } from '../../../../shared/const';
import { Sidebar } from '../../../../components/base/sidebar/sidebar';
import { useGetTrainingsQuery } from '../../../../store/training-process/training-api';
import EmptyBlock from '../../../../components/base/empty-block/empty-block';
import { TrainingCardMin } from '../../../../components/training-card-min/training-card-min';
import { useEffect, useState } from 'react';
import { TrainingsWithPaginationRdo } from '@project/rdo';
import { useGetCurrentUserQuery } from '../../../../store/user-process/user-api';
import { Link } from 'react-router-dom';

export const MyTrainingsPage = () => {
  const { data: user } = useGetCurrentUserQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetTrainingsQuery({
    limit: 6,
    page: currentPage,
    trainerId: user?.id,
  });
  const [allTrainings, setAllTrainings] = useState<
    TrainingsWithPaginationRdo['entities']
  >([]);

  useEffect(() => {
    if (data?.entities) {
      if (currentPage === 1) {
        setAllTrainings(data.entities);
      } else {
        setAllTrainings((prevTrainings) => [
          ...prevTrainings,
          ...data.entities.filter(
            (newTraining) => !prevTrainings.some((t) => t.id === newTraining.id)
          ),
        ]);
      }
    }
  }, [data, currentPage]);

  const handleShowMore = () => {
    if (currentPage < Number(data?.totalPages)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleToTop = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle('MyTrainings')}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Мои тренировки</h1>
        <Sidebar>
          <Link
            to={AppRoute.Profile}
            className="btn-flat btn-flat--underlined my-training-form__btnback"
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </Link>
        </Sidebar>
        <div className="training-catalog">
          {!allTrainings?.length && !isFetching ? (
            <EmptyBlock />
          ) : (
            <div className="training-catalog__list">
              {allTrainings?.map((el, idx) => (
                <div key={el.id}>
                  <TrainingCardMin
                    training={el}
                    className="training-catalog__item"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="show-more training-catalog__show-more">
            {Number(data?.totalPages) > 1 ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
