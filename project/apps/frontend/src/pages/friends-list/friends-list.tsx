import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import React from 'react';
import { FriendsList } from '../../components/friends-list/friends-list';

export const FriendsListPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('Friends')}</title>
      </Helmet>

      <FriendsList />
    </>
  );
};
