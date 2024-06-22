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
import Input from '../ui/Input/Input';
import RadioInput from '../ui/RadioInput/RadioInput';

enum FormFieldName {
  FirstName = 'firstname',
  Email = 'email',
  Password = 'password',
  DateOfBirth = 'dateOfBirth',
  Gender = 'gender',
  Location = 'location',
  Role = 'role',
  Avatar = 'avatar',
  isAgreements = 'isAgreements',
}

const RegisterForm: React.FC = () => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    [FormFieldName.FirstName]: '',
    [FormFieldName.Email]: '',
    [FormFieldName.Password]: '',
    [FormFieldName.DateOfBirth]: '',
    [FormFieldName.Gender]: '',
    [FormFieldName.Location]: '',
    [FormFieldName.Role]: 'user',
    [FormFieldName.Avatar]: null as File | null,
    [FormFieldName.isAgreements]: true,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { firstname, email, password, dateOfBirth, isAgreements, gender } =
    formData;
  const isValid = Object.values(formData).every(Boolean);
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked, type, files } = evt.target;
    const isCheckbox = type === 'checkbox';
    const isFile = type === 'file';

    if (isFile && files) {
      const [file] = Array.from(files);
      setFormData((prev) => ({ ...prev, [name]: file }));
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: isCheckbox ? checked : value,
      }));
    }
  };

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (value !== null) {
        if (typeof value === 'boolean') {
          formDataToSend.append(key, value.toString());
        } else {
          formDataToSend.append(key, value);
        }
      }
    }

    try {
      const userData = await register(formDataToSend).unwrap();
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
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="sign-up">
            <div className="sign-up__load-photo">
              <label className="input-load-avatar">
                <input
                  className="visually-hidden"
                  type="file"
                  accept="image/png, image/jpeg"
                  name={FormFieldName.Avatar}
                  onChange={onChange}
                />

                {avatarPreview ? (
                  <div className="input-load-avatar__avatar">
                    <img src={avatarPreview} alt="Avatar Preview" />
                  </div>
                ) : (
                  <span className="input-load-avatar__btn">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import"></use>
                    </svg>
                  </span>
                )}
              </label>

              <div className="sign-up__description">
                <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                <span className="sign-up__text">
                  JPG, PNG, оптимальный размер 100×100 px
                </span>
              </div>
            </div>
            <div className="sign-up__data">
              <Input
                label="Имя"
                name={FormFieldName.FirstName}
                value={firstname}
                onChange={onChange}
              />
              <Input
                type="email"
                label="E-mail"
                name={FormFieldName.Email}
                value={email}
                onChange={onChange}
                autoComplete="off"
              />
              <Input
                type="date"
                label="Дата рождения"
                name={FormFieldName.DateOfBirth}
                max="2099-12-31"
                value={dateOfBirth}
                onChange={onChange}
              />
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

              <Input
                type="password"
                label="Пароль"
                name={FormFieldName.Password}
                value={password}
                onChange={onChange}
              />
              <div className="sign-up__radio">
                <span className="sign-up__label">Пол</span>
                <div className="custom-toggle-radio custom-toggle-radio--big">
                  <RadioInput
                    label="Мужской"
                    name={FormFieldName.Gender}
                    value="Male"
                    onChange={onChange}
                    checked={gender === 'Male'}
                  />
                  <RadioInput
                    label="Женский"
                    name={FormFieldName.Gender}
                    value="Female"
                    onChange={onChange}
                    checked={gender === 'Female'}
                  />
                  <RadioInput
                    label="Неважно"
                    name={FormFieldName.Gender}
                    value="Any"
                    onChange={onChange}
                    checked={gender === 'Any'}
                  />
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
                  name={FormFieldName.isAgreements}
                  checked={isAgreements}
                  onChange={onChange}
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

            <button
              disabled={!isValid || isLoading}
              className="btn sign-up__button"
              type="submit"
            >
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
