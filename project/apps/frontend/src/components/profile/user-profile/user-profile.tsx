import PersonalAccountUser from '../../personal-account/user/personal-account-user';
import { Sidebar } from '../../base/sidebar/sidebar';
import UserProfileInfo from '../../forms/user-info/user-info';

export const UserProfile = () => {
  return (
    <>
      <Sidebar>
        <UserProfileInfo />
      </Sidebar>
      <PersonalAccountUser />
    </>
  );
};
