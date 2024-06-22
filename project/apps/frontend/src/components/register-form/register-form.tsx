import React, { ChangeEventHandler } from 'react';
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
import RoleSelector from '../role-selector/role-selector';
import CustomSelect from '../ui/Select/Select';

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

export enum UserLocation {
  Pionerskaya = 'Pionerskaya',
  Petrogradskaya = 'Petrogradskaya',
  Udelnaya = 'Udelnaya',
  Zvezdnaya = 'Zvezdnaya',
  Sportivnaya = 'Sportivnaya',
}

const locationOptions = Object.values(UserLocation).map((location) => ({
  value: location,
  label: location,
}));

const RegisterForm: React.FC = () => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>({
    value: 'Pionerskaya',
    label: 'Pionerskaya',
  });
  const [formData, setFormData] = useState({
    [FormFieldName.FirstName]: 'test',
    [FormFieldName.Email]: 'test@test.ru',
    [FormFieldName.Password]: '12345678',
    [FormFieldName.DateOfBirth]: '2024-06-22',
    [FormFieldName.Gender]: 'Male',
    [FormFieldName.Role]: 'user',
    [FormFieldName.Avatar]: null as File | null,
    [FormFieldName.isAgreements]: true,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {
    firstname,
    email,
    password,
    dateOfBirth,
    isAgreements,
    gender,
    role,
  } = formData;
  const isValid = Object.values(formData).every(Boolean);
  const onChange: ChangeEventHandler = (evt: ChangeEvent<HTMLInputElement>) => {
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
    formDataToSend.append('location', String(selectedOption?.value));
    try {
      const userData = await register(formDataToSend).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.error('Failed to register: ', err);
    }
  };

  const roleOptions = [
    {
      value: 'user',
      label: 'Я хочу тренироваться',
      icon: '#icon-weight',
    },
  ];

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return (
    <Popup isOpen title="Регистрация" className="popup-form--sign-up">
      <div className="popup-form__form">
        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
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

              <CustomSelect
                options={locationOptions}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Выберите одну из опций"
              />

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
            <RoleSelector
              name={FormFieldName.Role}
              legend="Выберите роль"
              options={roleOptions}
              onChange={onChange}
              selectedValue={role}
            />
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
              // disabled={!isValid || isLoading}
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
