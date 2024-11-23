import { Link } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';
import Popup from '../../ui/popup/popup';
import { HttpStatusCode } from 'axios';
import { useAuthRole } from '../../../hooks/useAuth';

type TErrorScreen = {
  redirectMessage?: string;
};

export const PermissionScreen = ({
  redirectMessage = 'Перейти на главную',
}: TErrorScreen) => {
  const { isUserAuth } = useAuthRole();

  return (
    <Popup
      isStatic
      title={`Ошибка ${HttpStatusCode.Forbidden}`}
      className="popup-form popup-form--sign-in"
    >
      <div className="popup-form__content">
        <div className="popup-form__form">
          <h2 className="sign-up__legend">Доступ к странице запрещён.</h2>
          <p>У вас недостаточно прав для просмотра страницы</p>
          <div className="sign-up">
            <Link
              className="btn sign-up__button"
              to={isUserAuth ? AppRoute.Index : AppRoute.Profile}
            >
              {redirectMessage}
            </Link>
          </div>
        </div>
      </div>
    </Popup>
  );
};
