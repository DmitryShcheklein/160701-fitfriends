import EmptyBlock from '../../base/empty-block/empty-block';
import { useGetPopularTrainingsQuery } from '../../../store/training-process/training-api';
import { AppRoute } from '../../../shared/const';
import { Link } from 'react-router-dom';
import { TrainingCardMin } from '../../training-card-min/training-card-min';
import CarouselSlider from '../../ui/carousel-slider/carousel-slider';

export const PopularOffers = () => {
  const { data: items } = useGetPopularTrainingsQuery({});

  if (!items?.length) {
    return <EmptyBlock />;
  }

  return (
    <CarouselSlider
      id="popular-trainings"
      options={{ slidesPerView: 4 }}
      title="Популярные тренировки"
      slides={items.map((el) => (
        <TrainingCardMin training={el} />
      ))}
      extraButton={
        <Link
          to={AppRoute.Catalog}
          className="btn-flat popular-trainings__button"
        >
          <span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </Link>
      }
    />
  );
};
