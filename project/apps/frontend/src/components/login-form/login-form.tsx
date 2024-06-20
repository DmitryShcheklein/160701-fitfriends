import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/auth-process/auth-api';
import { setCredentials } from '../../store/auth-process/auth-process';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/const';
import Popup from '../popup/popup';

enum FormFieldName {
  Email = 'email',
  Password = 'password',
}

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    [FormFieldName.Email]: 'admin@admin.ru',
    [FormFieldName.Password]: 'adminnew',
  });
  const { email, password } = formData;

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const userData = await login(formData).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.error('Failed to log in: ', err);
    }
  };

  return (
    <Popup isOpen className="popup-form--sign-in" title={'Вход'}>
      <div className="popup-form__form">
        <form onSubmit={handleFormSubmit}>
          <div className="sign-in">
            <div className="custom-input sign-in__input">
              <label>
                <span className="custom-input__label">E-mail</span>
                <span className="custom-input__wrapper">
                  <input
                    type="email"
                    name={FormFieldName.Email}
                    id={FormFieldName.Email}
                    onChange={onChange}
                    value={email}
                    autoComplete="autoComplete"
                    required
                  />
                </span>
              </label>
            </div>
            <div className="custom-input sign-in__input">
              <label>
                <span className="custom-input__label">Пароль</span>
                <span className="custom-input__wrapper">
                  <input
                    type="password"
                    placeholder=""
                    name={FormFieldName.Password}
                    id={FormFieldName.Password}
                    onChange={onChange}
                    value={password}
                    autoComplete="autoComplete"
                    required
                  />
                </span>
              </label>
            </div>
            <button
              className="btn sign-in__button"
              disabled={isLoading || !email || !password}
            >
              Продолжить
            </button>

            <Link
              className="btn btn--small btn--outlined sign-in__button"
              to={AppRoute.Register}
            >
              Зарегистрироваться?
            </Link>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default LoginForm;
