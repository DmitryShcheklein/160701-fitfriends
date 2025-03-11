import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserProfile } from '../../components/profile/user-profile/user-profile';
import { TrainerProfile } from '../../components/profile/trainer-profile/trainer-profile';
import { getPageTitle } from '../../shared/const';
import { useGetCurrentUserQuery } from '../../store/user-process/user-api';
import { LoaderPage } from '../../components/base/loaders/loader-page/loader-page';
import { Sidebar } from '../../components/base/sidebar/sidebar';
import UserProfileInfo from '../../components/forms/user-info/user-info';
import { useAuthRole } from '../../hooks/useAuth';

const ProfilePage = () => {
  const { isLoading } = useGetCurrentUserQuery();
  const { isUserAuth, isTrainerAuth } = useAuthRole();

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Profile')}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Личный кабинет</h1>

        <Sidebar>
          <UserProfileInfo />
        </Sidebar>

        {isLoading ? (
          <LoaderPage />
        ) : (
          <>
            {isUserAuth && <UserProfile />}
            {isTrainerAuth && <TrainerProfile />}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
