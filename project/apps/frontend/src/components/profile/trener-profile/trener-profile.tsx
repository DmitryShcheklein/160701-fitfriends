import PersonalAccountTrener from '../../personal-account/trener/personal-account-trener';
import { Sidebar } from '../../base/sidebar/sidebar';
import UserProfileInfo from '../../forms/user-info/user-info';

export const TrenerProfile = () => {
  return (
    <>
      <Sidebar>
        <UserProfileInfo />
      </Sidebar>
      <PersonalAccountTrener />
    </>
  );
};
