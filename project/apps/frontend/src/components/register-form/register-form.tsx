import React, { ChangeEventHandler } from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../shared/const';
import { useRegisterMutation } from '../../store/auth-process/auth-api';
import { setCredentials } from '../../store/auth-process/auth-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import Popup from '../popup/popup';
import Input from '../ui/input/input';
import RadioInput from '../ui/radio-input/radio-input';
import RoleSelector from '../role-selector/role-selector';
import CustomSelect from '../ui/select/select';
import { roleOptions, locationOptions } from './register.data';
import { UserLocation, UserRole, UserGender } from '@project/enums';
import { toast } from 'react-toastify';

const FormFieldName = {
  FirstName: 'firstname',
  Email: 'email',
  Password: 'password',
  DateOfBirth: 'dateOfBirth',
  Gender: 'gender',
  Location: 'location',
  Role: 'role',
  Avatar: 'avatar',
  isAgreements: 'isAgreements',
} as const;

type FieldName = (typeof FormFieldName)[keyof typeof FormFieldName];
type TState = Record<FieldName, any>;

const randNumber = Math.random().toFixed(3);
const MOCK: TState = {
  firstname: `Admin${randNumber}`,
  email: `admin${randNumber}@admin.ru`,
  password: 'adminnew',
  // dateOfBirth: '2024-01-11T14:19:59.298Z',
  gender: UserGender.Male,
  role: UserRole.User,
  location: UserLocation.Sportivnaya,
  avatar: undefined,
  isAgreements: true,
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState<TState>({
    firstname: '',
    email: '',
    password: '',
    dateOfBirth: undefined,
    gender: undefined,
    role: undefined,
    location: undefined,
    avatar: undefined,
    isAgreements: false,
    ...MOCK,
  });

  const [avatarPreview, setAvatarPreview] = useState<string>();
  const {
    firstname,
    email,
    password,
    dateOfBirth,
    isAgreements,
    gender,
    role,
    location,
  } = formData;

  const isValid = Object.entries(formData)
    .filter(
      ([key]) =>
        key !== FormFieldName.Avatar && key !== FormFieldName.DateOfBirth
    )
    .every(([_, value]) => Boolean(value));
  const onChange: ChangeEventHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked, type, files } = evt.target;
    const isCheckbox = type === 'checkbox';
    const isFile = type === 'file';
    const isDate = type === 'date';

    if (isFile && files) {
      const [file] = Array.from(files);
      setFormData((prev) => ({ ...prev, [name]: file }));
      setAvatarPreview(URL.createObjectURL(file));
    } else if (isDate) {
      setFormData((prev) => ({
        ...prev,
        [name]: new Date(value).toISOString().split('T')[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: isCheckbox ? checked : value,
      }));
    }
  };

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const { isAgreements, ...sendData } = formData;
      const form = new FormData();

      Object.entries(sendData).forEach(([key, value]) => {
        if (value) {
          form.append(key, value);
        }
      });

      const userData = await register(form).unwrap();
      dispatch(setCredentials(userData));
      toast.success('Вы успешно зарегистрированы!');
      navigate(AppRoute.Questionnaire);
    } catch (err) {
      console.error('Failed to register: ', err);
      toast.error(err.data.message.toString());
    }
  };

  return (
    <Popup isOpen title="Регистрация" className="popup-form--sign-up">
      <div className="popup-form__form">
        <form onSubmit={handleFormSubmit} autoComplete="off">
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
                value={dateOfBirth || ''}
                onChange={onChange}
              />

              <CustomSelect
                label="Ваша локация"
                name={FormFieldName.Location}
                options={locationOptions}
                value={locationOptions.find((el) => el.value === location)}
                onChange={(newValue: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    [FormFieldName.Location]: newValue.value,
                  }));
                }}
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
                    value={UserGender.Male}
                    onChange={onChange}
                    checked={gender === UserGender.Male}
                  />
                  <RadioInput
                    label="Женский"
                    name={FormFieldName.Gender}
                    value={UserGender.Female}
                    onChange={onChange}
                    checked={gender === UserGender.Female}
                  />
                  <RadioInput
                    label="Неважно"
                    name={FormFieldName.Gender}
                    value={UserGender.Any}
                    onChange={onChange}
                    checked={gender === UserGender.Any}
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
                  value={String(isAgreements)}
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
