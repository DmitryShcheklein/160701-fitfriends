import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import { IndexPageContent } from '../../components/index-page-content/index-page-content';

const IndexPage = () => (
  <>
    <Helmet>
      <title>{PageTitles.Index}</title>
    </Helmet>

    <IndexPageContent />
  </>
);

export default IndexPage;
