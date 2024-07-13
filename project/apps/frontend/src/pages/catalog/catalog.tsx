import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import { Sidebar } from '../../components/base/sidebar/sidebar';
import { CatalogSidebar } from '../../components/catalog-sidebar/catalog-sidebar';
import { useGetTrainingsQuery } from '../../store/training-process/training-api';
import EmptyBlock from '../../components/base/empty-block/empty-block';
import { TrainingSlide } from '../../components/slide-content/training-slide/training-slide';

export const CatalogPage = () => {
  const { data } = useGetTrainingsQuery({ limit: 6 });
  const trainings = data?.entities;

  return (
    <>
      <Helmet>
        <title>{PageTitles.Catalog}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <Sidebar>
          <CatalogSidebar />
        </Sidebar>

        {!trainings?.length ? (
          <EmptyBlock />
        ) : (
          <div className="my-trainings">
            <div className="my-trainings__list">
              {trainings.map((el) => (
                <TrainingSlide training={el} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogPage;
