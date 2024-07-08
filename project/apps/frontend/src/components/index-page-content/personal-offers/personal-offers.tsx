import { useGetTrainingsQuery } from '../../../store/training-process/training-api';
import EmptyBlock from '../../empty-block/empty-block';
import { SpecialSlide } from '../../slide-content/special-slide/special-slide';
import CarouselSlider from '../../ui/carousel-slider/carousel-slider';

const MAX_SLIDE_COUNT = 9;

export const PersonalOffers = () => {
  const { data } = useGetTrainingsQuery({ limit: 50 });
  const specialData = data?.entities
    .filter((el) => el.specialOffer)
    .slice(0, MAX_SLIDE_COUNT);

  if (!specialData?.length) {
    return <EmptyBlock className="special-for-you__wrapper" />;
  }

  return (
    <CarouselSlider
      id="special-for-you"
      options={{ slidesPerView: 3 }}
      title="Специально подобрано для вас"
      slides={specialData?.map((el) => (
        <SpecialSlide training={el} />
      ))}
      classNamesMap={{ wrapper: 'special-for-you__wrapper' }}
    />
  );
};
