import PersonalAccountTrainer from '../../personal-account/trener/personal-account-trainer';
import { Sidebar } from '../../base/sidebar/sidebar';
import UserProfileInfo from '../../forms/user-info/user-info';

export const TrainerProfile = () => {
  return (
    <>
      <Sidebar>
        <UserProfileInfo />
      </Sidebar>
      <PersonalAccountTrainer />
    </>
  );
};
