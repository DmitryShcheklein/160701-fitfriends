import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import { Sidebar } from '../../components/base/sidebar/sidebar';
import { CatalogSidebar } from '../../components/catalog-sidebar/catalog-sidebar';
import { useGetTrainingsQuery } from '../../store/training-process/training-api';
import EmptyBlock from '../../components/base/empty-block/empty-block';
import { TrainingThumb } from '../../components/slide-content/training-slide/training-slide';
import { useEffect, useState } from 'react';
import { TrainingsWithPaginationRdo } from '@project/rdo';

export const CatalogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetTrainingsQuery({
    limit: 6,
    page: currentPage,
  });
  const [allTrainings, setAllTrainings] = useState<
    TrainingsWithPaginationRdo['entities']
  >([]);

  useEffect(() => {
    if (data?.entities) {
      setAllTrainings((prevTrainings) => [...prevTrainings, ...data.entities]);
    }
  }, [data]);

  const handleShowMore = () => {
    if (currentPage < Number(data?.totalPages)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleToTop = () => {
    setCurrentPage(1);
    setAllTrainings([]);
  };

  return (
    <>
      <Helmet>
        <title>{PageTitles.Catalog}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Каталог тренировок</h1>
        <Sidebar>
          <CatalogSidebar filters={data?.filters} />
        </Sidebar>
        <div className="training-catalog">
          {!allTrainings?.length && !isFetching ? (
            <EmptyBlock />
          ) : (
            <div className="training-catalog__list">
              {allTrainings?.map((el) => (
                <TrainingThumb
                  training={el}
                  className="training-catalog__item"
                  key={el.id}
                />
              ))}
            </div>
          )}
          <div className="show-more training-catalog__show-more">
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
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
