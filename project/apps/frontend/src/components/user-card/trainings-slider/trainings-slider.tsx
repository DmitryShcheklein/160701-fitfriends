import CarouselSlider from '../../ui/carousel-slider/carousel-slider';
import { TrainingCardMin } from '../../training-card-min/training-card-min';
import { TrainingsQuery } from '@project/core';
import { useGetTrainingsQuery } from '../../../store/training-process/training-api';

interface TrainingsSliderProps {
  trainerId: string;
}
export const TrainingsSlider = ({ trainerId }: TrainingsSliderProps) => {
  const { data } = useGetTrainingsQuery({
    limit: 6,
    page: 1,
    trainerId,
  });

  return (
    <CarouselSlider
      id="Тренировки"
      options={{ slidesPerView: 4 }}
      title="Тренировки"
      slides={data?.entities?.map((el) => (
        <TrainingCardMin training={el} />
      ))}
    />
  );
};
