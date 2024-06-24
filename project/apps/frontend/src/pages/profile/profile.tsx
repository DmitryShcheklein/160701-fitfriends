import React from 'react';

import { UserProfile } from '../../components/profile/user-profile/user-profile';

const ProfilePage: React.FC = () => {
  return (
    <div className="inner-page__wrapper">
      <h1 className="visually-hidden">Личный кабинет</h1>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
