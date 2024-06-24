import PersonalAccountUser from '../../personal-account/user/personal-account-user';
import { Sidebar } from '../../sidebar/sidebar';
import UserProfileInfo from '../../user-info/user-info';

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
