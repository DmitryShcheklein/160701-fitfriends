import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';

const IndexPage = () => (
  <>
    <Helmet>
      <title>{PageTitles.Index}</title>
    </Helmet>

    <h1>Главная</h1>
  </>
);

export default IndexPage;
