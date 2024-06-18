import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import ErrorScreen from '../../components/error-screen/error-screen';

const Page404 = () => (
  <>
    <Helmet>
      <title>{PageTitles.Page404}</title>
    </Helmet>

    <ErrorScreen />
  </>
);

export default Page404;
