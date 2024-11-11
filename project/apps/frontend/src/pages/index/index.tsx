import { Helmet } from 'react-helmet-async';
import { getPageTitle, PageTitles } from '../../shared/const';
import { IndexPageContent } from '../../components/index-page-content/index-page-content';
import React from 'react';

const IndexPage = () => (
  <>
    <Helmet>
      <title>{getPageTitle('Index')}</title>
    </Helmet>

    <IndexPageContent />
  </>
);

export default IndexPage;
