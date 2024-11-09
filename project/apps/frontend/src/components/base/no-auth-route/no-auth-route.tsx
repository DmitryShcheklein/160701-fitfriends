import { AppRoute, AuthStatus } from '../../../shared/const';
import { useAppSelector } from '../../../hooks';
import {
  getAccessToken,
  getAuthorizationStatus,
} from '../../../store/auth-process/selectors';
import { Navigate } from 'react-router-dom';
import { LoaderPage } from '../../loaders/loader-page/loader-page';
import { useCheckAuthQuery } from '../../../store/auth-process/auth-api';

type TNoAuthRoute = JSX.Element;

export const NoAuthRoute = (children: TNoAuthRoute) => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthStatus.Auth;
  const isUnknown = authStatus === AuthStatus.Unknown;
  const accessToken = useAppSelector(getAccessToken);
  const { isLoading } = useCheckAuthQuery(undefined, {
    skip: !accessToken,
  });

  if (isLoading || isUnknown) {
    return <LoaderPage />;
  }

  if (isAuth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return children;
};
