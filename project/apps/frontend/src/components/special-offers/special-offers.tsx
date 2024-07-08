import SingleSlider from '../ui/single-slider/single-slider';
import EmptyBlock from '../empty-block/empty-block';
import { useGetTrainingsQuery } from '../../store/training-process/training-api';

const SpecialOffers = () => {
  const { data } = useGetTrainingsQuery({});
  console.log(data);

  if (!data) {
    return <EmptyBlock className="special-for-you__wrapper" />;
  }
  const slidesData = data.entities.filter((el) => el.specialOffer);

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

export default SpecialOffers;
