import { Schedule } from './components/schedule/schedule';
import { Menu } from './components/menu/menu';

export const UserProfile = () => {
  return (
    <div className="inner-page__content">
      <div className="personal-account-user">
        <Schedule />
        <Menu />
      </div>
    </div>
  );
};
