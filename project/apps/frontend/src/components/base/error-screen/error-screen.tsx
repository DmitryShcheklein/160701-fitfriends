import { Link } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';
import Popup from '../../ui/popup/popup';

type TErrorScreen = {
  redirectTo?: string;
  redirectMessage?: string;
};

const ErrorScreen = ({
  redirectTo = AppRoute.Intro,
  redirectMessage = 'Перейти на главную',
}: TErrorScreen) => (
  <Popup isStatic title="Ошибка 404" className="popup-form popup-form--sign-in">
    <div className="popup-form__content">
      <div className="popup-form__form">
        <h2 className="sign-up__legend">Страница не найдена.</h2>
        <p className="error__text">
          Возможно, страница была удалена или её вовсе не существовало.
        </p>
        <div className="sign-up">
          <Link className="btn sign-up__button" to={redirectTo}>
            {redirectMessage}
          </Link>
        </div>
      </div>
    </div>
  </Popup>
);

export default ErrorScreen;
