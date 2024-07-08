import CarouselSlider from '../../components/ui/carousel-slider/carousel-slider';
import {
  popularTrainingsSlides,
  specialForYouSlides,
} from './index-page-content.data';
import SpecialOffers from '../../components/special-offers/special-offers';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/const';

export const IndexPageContent = () => {
  return (
    <>
      <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
      </h1>

      <CarouselSlider
        id="special-for-you"
        options={{ slidesPerView: 3 }}
        title="Специально подобрано для вас"
        slides={specialForYouSlides}
        classNamesMap={{ wrapper: 'special-for-you__wrapper' }}
      />

      <SpecialOffers />

      <CarouselSlider
        id="popular-trainings"
        options={{ slidesPerView: 4 }}
        title="Популярные тренировки"
        slides={popularTrainingsSlides}
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
    </>
  );
};
