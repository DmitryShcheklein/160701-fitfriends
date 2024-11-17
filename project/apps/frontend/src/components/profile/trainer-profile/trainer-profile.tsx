import { Menu } from './components/menu/menu';
import { Sertificates } from './components/sertificates/sertificates';

export const TrainerProfile = () => {
  return (
    <div className="inner-page__content">
      <div className="personal-account-coach">
        <Menu />
        <Sertificates />
      </div>
    </div>
  );
};
