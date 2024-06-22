import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import SwiperSlider from '../../components/ui/SwiperSlider/Swiper-slider';
import { popularTrainingsSlides } from './index.data';

const IndexPage = () => (
  <>
    <Helmet>
      <title>{PageTitles.Index}</title>
    </Helmet>

    <h1 className="visually-hidden">
      FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
    </h1>

    <SwiperSlider
      id="special"
      options={{ slidesPerView: 4 }}
      title="Популярные тренировки"
      slides={popularTrainingsSlides
        .concat(popularTrainingsSlides)
        .concat(popularTrainingsSlides)
        .concat(popularTrainingsSlides)
        .concat(popularTrainingsSlides)
        .concat(popularTrainingsSlides)
        .concat(popularTrainingsSlides)}
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
