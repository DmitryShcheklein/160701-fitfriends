import { ChangeEventHandler } from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';
import { useRegisterMutation } from '../../../store/auth-process/auth-api';
import {
  setCredentials,
  setIsSubmitting,
} from '../../../store/auth-process/auth-slice';
import { useAppDispatch } from '../../../hooks';
import Popup from '../../ui/popup/popup';
import Input from '../../ui/input/input';
import RadioInput from '../../ui/radio-input/radio-input';
import RoleSelector from '../../ui/role-selector/role-selector';
import CustomSelect from '../../ui/select/select';
import {
  roleOptions,
  locationOptions,
  genderOptions,
} from '../../../shared/data';
import { UserGender, UserRole } from '@project/enums';
import { toast } from 'react-toastify';
import { groupErrors } from '../../../shared/helpers/groupErrors';

const FormFieldName = {
  firstName: 'firstName',
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

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState<TState>({
    firstName: '',
    email: '',
    password: '',
    dateOfBirth: undefined,
    gender: undefined,
    role: UserRole.Trainer,
    location: undefined,
    avatar: undefined,
    isAgreements: false,
  });

  const [avatarPreview, setAvatarPreview] = useState<string>();
  const {
    firstName,
    email,
    password,
    dateOfBirth,
    isAgreements,
    gender,
    role,
    location,
  } = formData;

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

      dispatch(setIsSubmitting(true));

      navigate(
        userData.role === UserRole.User
          ? AppRoute.QuestionnaireUser
          : AppRoute.QuestionnaireTrainer
      );

      toast.success('Вы успешно зарегистрированы!');
    } catch (err: any) {
      dispatch(setIsSubmitting(false));

      console.error('Failed to register: ', err);

      if (Array.isArray(err.data.message)) {
        const groupedErrors = groupErrors(err.data.message);
        Object.keys(groupedErrors).forEach((key) => {
          const errorMessage = groupedErrors[key].join('\n');
          toast.error(errorMessage, {
            style: { whiteSpace: 'pre-line' },
            autoClose: 10_000,
          });
        });
      } else {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <Popup isStatic title="Регистрация" className="popup-form--sign-up">
      <div className="popup-form__content">
        <form
          className="popup-form__form"
          onSubmit={handleFormSubmit}
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
                name={FormFieldName.firstName}
                value={firstName}
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
                  {genderOptions.map(({ value, label }) => (
                    <RadioInput
                      label={label}
                      name={FormFieldName.Gender}
                      value={value}
                      onChange={onChange}
                      checked={gender === value}
                    />
                  ))}
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
              disabled={isLoading || !isAgreements}
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
