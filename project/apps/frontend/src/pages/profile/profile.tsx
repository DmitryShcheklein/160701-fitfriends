import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserProfile } from '../../components/profile/user-profile/user-profile';
import { PageTitles } from '../../shared/const';
import { useGetUserQuery } from '../../store/user-process/user-api';
import { LoaderPage } from '../../components/loaders/loader-page/loader-page';

const ProfilePage: React.FC = () => {
  const { isLoading } = useGetUserQuery();

  return (
    <>
      <Helmet>
        <title>{PageTitles.Profile}</title>
      </Helmet>
      <div className="inner-page__wrapper">
        <h1 className="visually-hidden">Личный кабинет</h1>

        {isLoading ? <LoaderPage /> : <UserProfile />}
      </div>
    </>
  );
};

export default ProfilePage;
