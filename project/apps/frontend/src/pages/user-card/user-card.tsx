import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import React from 'react';

export const UserCardPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('UserCard')}</title>
      </Helmet>
    </>
  );
};
