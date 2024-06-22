import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';

const IndexPage = () => (
  <>
    <Helmet>
      <title>{PageTitles.Index}</title>
    </Helmet>

    <h1 className="visually-hidden">
      FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
    </h1>
  </>
);

export default IndexPage;
