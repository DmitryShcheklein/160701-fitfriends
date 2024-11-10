import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, PageTitles } from '../../shared/const';

import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import RegisterForm from '../../components/forms/register-form/register-form';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>{PageTitles.Register}</title>
      </Helmet>

      <RegisterForm />
    </>
  );
};

export default RegisterPage;
