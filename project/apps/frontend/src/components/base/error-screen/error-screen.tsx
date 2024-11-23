import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../../shared/const';
import Popup from '../../ui/popup/popup';
import { useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/auth-process/selectors';
import { HttpStatusCode } from 'axios';

type TErrorScreen = {
  redirectMessage?: string;
};

export const ErrorScreen = ({
  redirectMessage = 'Перейти на главную',
}: TErrorScreen) => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  return (
    <Popup
      isStatic
      title={`Ошибка ${HttpStatusCode.NotFound}`}
      className="popup-form popup-form--sign-in"
    >
      <div className="popup-form__content">
        <div className="popup-form__form">
          <h2 className="sign-up__legend">Страница не найдена.</h2>
          <p className="error__text">
            Возможно, страница была удалена или её вовсе не существовало.
          </p>
          <div className="sign-up">
            <Link
              className="btn sign-up__button"
              to={isAuth ? AppRoute.Index : AppRoute.Intro}
            >
              {redirectMessage}
            </Link>
          </div>
        </div>
      </div>
    </Popup>
  );
};
