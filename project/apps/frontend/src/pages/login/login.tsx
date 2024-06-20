import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, PageTitles } from '../../shared/const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import LoginForm from '../../components/login-form/login-form';

const LoginPage = () => {
  const authStatus = useAppSelector(getAuthorizationStatus);

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return (
    <>
      <Helmet>
        <title>{PageTitles.Login}</title>
      </Helmet>

      <LoginForm />
    </>
  );
};

export default LoginPage;
