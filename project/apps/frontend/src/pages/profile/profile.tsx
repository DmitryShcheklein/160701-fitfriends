import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserProfile } from '../../components/profile/user-profile/user-profile';
import { TrainerProfile } from '../../components/profile/trainer-profile/trainer-profile';
import { getPageTitle } from '../../shared/const';
import { useUserQuery } from '../../store/user-process/user-api';
import { LoaderPage } from '../../components/base/loaders/loader-page/loader-page';

const ProfilePage = () => {
  const { isLoading } = useUserQuery();

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Profile')}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Личный кабинет</h1>

        {isLoading ? <LoaderPage /> : <TrainerProfile />}
      </div>
    </>
  );
};

export default ProfilePage;
