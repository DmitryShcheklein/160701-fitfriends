import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, AuthStatus } from '../../../shared/const';
import { useAppSelector } from '../../../hooks';
import {
  getAccessToken,
  getAuthorizationStatus,
} from '../../../store/auth-process/selectors';
import { LoaderPage } from '../../base/loaders/loader-page/loader-page';
import { useCheckAuthQuery } from '../../../store/auth-process/auth-api';
import { ReactNode } from 'react';

export const PrivateRoute = (children: ReactNode) => {
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

  if (!accessToken) {
    return <Navigate to={AppRoute.Intro} />;
  }

  if (!isAuth) {
    toast.warn(
      'You are not logged in or you do not have permission to this page.'
    );
  }

  return isAuth ? children : null;
};
