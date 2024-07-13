import { Link } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';

type TErrorScreen = {
  redirectTo?: string;
  redirectMessage?: string;
};

const ErrorScreen = ({
  redirectTo = AppRoute.Intro,
  redirectMessage = 'Перейти на главную',
}: TErrorScreen) => (
  <div className="popup-form popup-form--sign-in">
    <div className="popup-form__wrapper">
      <div className="popup-form__content">
        <div className="popup-form__title-wrapper">
          <h1 className="popup-form__title">Ошибка 404</h1>
        </div>
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
    </div>
  </div>
);

export default ErrorScreen;
