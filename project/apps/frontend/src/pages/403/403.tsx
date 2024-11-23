import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import React from 'react';
import { PermissionScreen } from '../../components/base/permission-screen/permission-screen';

const Page403 = () => (
  <>
    <Helmet>
      <title>{getPageTitle('Page403')}</title>
    </Helmet>

    <PermissionScreen />
  </>
);

export default Page403;
