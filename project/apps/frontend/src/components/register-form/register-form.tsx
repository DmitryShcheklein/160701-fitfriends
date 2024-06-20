import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../shared/const';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../store/auth-process/auth-api';
import { setCredentials } from '../../store/auth-process/auth-process';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import Popup from '../popup/popup';

enum FormFieldName {
  FirstName = 'firstname',
  Email = 'email',
  Password = 'password',
}

const RegisterForm: React.FC = () => {
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
    return <Navigate to={AppRoute.Index} />;
  }

  return (
    <Popup isOpen title="Регистрация" className="popup-form--sign-up">
      <div className="popup-form__form">
        <form onSubmit={handleFormSubmit}>
          <div className="sign-up">
            <div className="sign-up__load-photo">
              <div className="input-load-avatar">
                <label>
                  <input
                    className="visually-hidden"
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                  <span className="input-load-avatar__btn">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import"></use>
                    </svg>
                  </span>
                </label>
              </div>
              <div className="sign-up__description">
                <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                <span className="sign-up__text">
                  JPG, PNG, оптимальный размер 100×100 px
                </span>
              </div>
            </div>
            <div className="sign-up__data">
              <div className="custom-input">
                <label>
                  <span className="custom-input__label">Имя</span>
                  <span className="custom-input__wrapper">
                    <input type="text" name="name" />
                  </span>
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <span className="custom-input__label">E-mail</span>
                  <span className="custom-input__wrapper">
                    <input type="email" name="email" />
                  </span>
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <span className="custom-input__label">Дата рождения</span>
                  <span className="custom-input__wrapper">
                    <input type="date" name="birthday" max="2099-12-31" />
                  </span>
                </label>
              </div>
              <div className="custom-select custom-select--not-selected">
                <span className="custom-select__label">Ваша локация</span>
                <button
                  className="custom-select__button"
                  type="button"
                  aria-label="Выберите одну из опций"
                >
                  <span className="custom-select__text"></span>
                  <span className="custom-select__icon">
                    <svg width="15" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-down"></use>
                    </svg>
                  </span>
                </button>
                <ul className="custom-select__list" role="listbox"></ul>
              </div>
              <div className="custom-input">
                <label>
                  <span className="custom-input__label">Пароль</span>
                  <span className="custom-input__wrapper">
                    <input type="password" name="password" autoComplete="off" />
                  </span>
                </label>
              </div>
              <div className="sign-up__radio">
                <span className="sign-up__label">Пол</span>
                <div className="custom-toggle-radio custom-toggle-radio--big">
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input type="radio" name="sex" />
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">
                        Мужской
                      </span>
                    </label>
                  </div>
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input type="radio" name="sex" defaultChecked />
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">
                        Женский
                      </span>
                    </label>
                  </div>
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input type="radio" name="sex" />
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">
                        Неважно
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="sign-up__role">
              <h2 className="sign-up__legend">Выберите роль</h2>
              <div className="role-selector sign-up__role-selector">
                <div className="role-btn">
                  <label>
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="role"
                      value="coach"
                      defaultChecked
                    />
                    <span className="role-btn__icon">
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref="#icon-cup"></use>
                      </svg>
                    </span>
                    <span className="role-btn__btn">Я хочу тренировать</span>
                  </label>
                </div>
                <div className="role-btn">
                  <label>
                    <input
                      className="visually-hidden"
                      type="radio"
                      name="role"
                      value="sportsman"
                    />
                    <span className="role-btn__icon">
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref="#icon-weight"></use>
                      </svg>
                    </span>
                    <span className="role-btn__btn">Я хочу тренироваться</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="sign-up__checkbox">
              <label>
                <input
                  type="checkbox"
                  value="user-agreement"
                  name="user-agreement"
                  defaultChecked
                />
                <span className="sign-up__checkbox-icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="sign-up__checkbox-label">
                  Я соглашаюсь с <span>политикой конфиденциальности</span>{' '}
                  компании
                </span>
              </label>
            </div>

            <button className="btn sign-up__button" type="submit">
              Продолжить
            </button>

            <Link
              className="btn btn--small btn--outlined sign-in__button"
              to={AppRoute.Login}
            >
              Уже зарегистрированы?
            </Link>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default RegisterForm;
