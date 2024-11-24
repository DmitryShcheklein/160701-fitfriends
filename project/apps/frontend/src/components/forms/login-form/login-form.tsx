import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../store/auth-process/auth-api';
import { setCredentials } from '../../../store/auth-process/auth-slice';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';
import Popup from '../../ui/popup/popup';
import Input from '../../ui/input/input';
import { toast } from 'react-toastify';

const FormFieldName = {
  Email: 'email',
  Password: 'password',
} as const;

type FormFieldName = (typeof FormFieldName)[keyof typeof FormFieldName];

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState<Record<FormFieldName, string>>({
    email: '',
    password: '',
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
    } catch (err: any) {
      console.error('Failed to log in: ', err);
      toast.error(err.data.message.toString());
    }
  };

  return (
    <Popup isStatic className="popup-form--sign-in" title="Вход">
      <div className="popup-form__content">
        <form className="popup-form__form" onSubmit={handleFormSubmit}>
          <div className="sign-in">
            <Input
              className="sign-in__input"
              label="E-mail"
              type="email"
              name={FormFieldName.Email}
              onChange={onChange}
              value={email}
            />
            <Input
              className="sign-in__input"
              label="Пароль"
              type="password"
              placeholder=""
              name={FormFieldName.Password}
              id={FormFieldName.Password}
              onChange={onChange}
              value={password}
            />

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
