import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
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
  const [showPassword, setShowPasword] = useState(true);
  const handleButtonEyeClick = () => {
    setShowPasword(!showPassword);
  };
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
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <>
      <Helmet>
        <title>{PageTitles.Login}</title>
      </Helmet>
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">
          Новый пользователь?{' '}
          <Link className="login__link" to={AppRoute.Register}>
            Зарегистрируйтесь
          </Link>{' '}
          прямо сейчас
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input
              type="email"
              name={FormFieldName.Email}
              id={FormFieldName.Email}
              onChange={onChange}
              value={email}
              autoComplete="off"
              required
            />
            {!email && <p className="input-login__error">Заполните поле</p>}
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label>
            <span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="• • • • • • • • • • • •"
                name={FormFieldName.Password}
                id={FormFieldName.Password}
                onChange={onChange}
                value={formData.password}
                autoComplete="off"
                required
              />
              <button
                className="input-login__button-eye"
                type="button"
                onClick={handleButtonEyeClick}
              >
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            {!password && <p className="input-login__error">Заполните поле</p>}
          </div>
          <button
            className="button login__button button--medium"
            disabled={isLoading || !email || !password}
          >
            Войти
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
