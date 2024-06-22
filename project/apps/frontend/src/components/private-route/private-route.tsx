import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, AuthStatus } from '../../shared/const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';

type TPrivateRoute = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: TPrivateRoute) => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthStatus.Auth;
  const isUnknown = authStatus === AuthStatus.Unknown;

  if (!isAuth && !isUnknown) {
    toast.warn(
      'You are not logged in or you do not have permission to this page.'
    );
  }

  return isAuth ? children : <Navigate to={AppRoute.Intro} />;
};

export default PrivateRoute;
