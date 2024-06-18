import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, PageTitles } from '../../shared/const';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/auth-process/auth-api';
import { setCredentials } from '../../store/auth-process/auth-process';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';

enum FormFieldName {
  Email = 'email',
  Password = 'password',
}

const LoginPage = () => {
  const authStatus = useAppSelector(getAuthorizationStatus);
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

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return (
    <>
      <Helmet>
        <title>{PageTitles.Login}</title>
      </Helmet>

      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
