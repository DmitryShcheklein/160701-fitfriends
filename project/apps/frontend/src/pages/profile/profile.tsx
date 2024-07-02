import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserProfile } from '../../components/profile/user-profile/user-profile';
import { PageTitles } from '../../shared/const';

const ProfilePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{PageTitles.Profile}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Личный кабинет</h1>
        <UserProfile />
      </div>
    </>
  );
};

export default ProfilePage;
