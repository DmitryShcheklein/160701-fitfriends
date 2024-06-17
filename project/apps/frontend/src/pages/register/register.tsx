import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, PageTitles } from '../../shared/const';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../store/auth-process/auth-api';
import { setCredentials } from '../../store/auth-process/auth-process';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';

enum FormFieldName {
  FirstName = 'firstname',
  Email = 'email',
  Password = 'password',
}

const RegisterPage = () => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    [FormFieldName.FirstName]: '',
    [FormFieldName.Email]: '',
    [FormFieldName.Password]: '',
  });
  const { firstname, email, password } = formData;
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
      const userData = await register(formData).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.error('Failed to register: ', err);
    }
  };

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <>
      <Helmet>
        <title>{PageTitles.Register}</title>
      </Helmet>
      <section className="login">
        <h1 className="login__title">Регистрация</h1>
        <p className="login__text">
          Уже зарегистрированы?{' '}
          <Link className="login__link" to={AppRoute.Login}>
            Войдите
          </Link>{' '}
          прямо сейчас
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="input-login">
            <label htmlFor="name">Введите имя</label>
            <input
              type="text"
              name={FormFieldName.FirstName}
              id={FormFieldName.FirstName}
              onChange={onChange}
              value={firstname}
              autoComplete="off"
              required
            />
            {!firstname && <p className="input-login__error">Заполните поле</p>}
          </div>
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
            <label htmlFor="passwordRegister">Придумайте пароль</label>
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
            disabled={isLoading || !firstname || !email || !password}
          >
            Зарегистрироваться
          </button>
        </form>
      </section>
    </>
  );
};

export default RegisterPage;
