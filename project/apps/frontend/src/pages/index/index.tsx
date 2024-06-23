import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import CarouselSlider from '../../components/ui/carousel-slider/carousel-slider';
import { popularTrainingsSlides, specialForYouSlides } from './index.data';
import SpecialOffers from '../../components/special-offers/special-offers';

const IndexPage = () => (
  <>
    <Helmet>
      <title>{PageTitles.Index}</title>
    </Helmet>

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
        <button className="btn-flat popular-trainings__button" type="button">
          <span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
      }
    />
  </>
);

export default IndexPage;
