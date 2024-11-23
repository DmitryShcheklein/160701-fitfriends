import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import { ErrorScreen } from '../../components/base/error-screen/error-screen';
import React from 'react';

const Page404 = () => (
  <>
    <Helmet>
      <title>{getPageTitle('Page404')}</title>
    </Helmet>

    <ErrorScreen />
  </>
);

export default Page404;
