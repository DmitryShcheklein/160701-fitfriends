import { SpecialOffers } from './special-offers/special-offers';
import { PersonalOffers } from './personal-offers/personal-offers';
import { PopularOffers } from './popular-offers/popular-offers';

export const IndexPageContent = () => {
  return (
    <>
      <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
      </h1>

      <PersonalOffers />

      <SpecialOffers />

      <PopularOffers />
    </>
  );
};
