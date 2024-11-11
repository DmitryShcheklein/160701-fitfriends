import { Helmet } from 'react-helmet-async';
import { AppRoute, getPageTitle } from '../../shared/const';
import { Sidebar } from '../../components/base/sidebar/sidebar';
import { Link, useParams } from 'react-router-dom';
import { useGetTrainingByIdQuery } from '../../store/training-process/training-api';
import { LoaderPage } from '../../components/base/loaders/loader-page/loader-page';
import { Comments } from '../../components/training-card/components/comments/comments';
import { TrainingCard } from '../../components/training-card/training-card';
import React from 'react';

const TrainingCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const trainingId = String(id);

  const { isLoading } = useGetTrainingByIdQuery(trainingId);

  if (isLoading) return <LoaderPage />;

  return (
    <>
      <Helmet>
        <title>{getPageTitle('TrainingCardPage')}</title>
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
          <Comments trainingId={trainingId} />
        </Sidebar>

        <TrainingCard trainingId={trainingId} />
      </div>
    </>
  );
};

export default TrainingCardPage;
