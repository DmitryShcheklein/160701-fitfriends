import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';

const Page404 = () => (
  <>
    <Helmet>
      <title>{PageTitles.Page404}</title>
    </Helmet>

    <h1>Ошибка 404</h1>
  </>
);

export default Page404;
