import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import React from 'react';
import { UserCard } from '../../components/user-card/user-card';

export const UserCardPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('UserCard')}</title>
      </Helmet>

      <UserCard />
    </>
  );
};
