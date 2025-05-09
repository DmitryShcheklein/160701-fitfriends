import SingleSlider from '../../ui/single-slider/single-slider';
import EmptyBlock from '../../base/empty-block/empty-block';
import { useGetSpecialTrainingsQuery } from '../../../store/training-process/training-api';

const MAX_SLIDE_COUNT = 3;

export const SpecialOffers = () => {
  const { data } = useGetSpecialTrainingsQuery({});

  const slidesData = data
    ?.filter((el) => el.specialOffer)
    .slice(0, MAX_SLIDE_COUNT);

  if (!slidesData?.length) {
    return <EmptyBlock className="special-for-you__wrapper" />;
  }

  return (
    <section className="special-offers">
      <div className="special-offers__wrapper">
        <h2 className="visually-hidden">Специальные предложения</h2>

        <SingleSlider items={slidesData} />

        <EmptyBlock />
      </div>
    </section>
  );
};
