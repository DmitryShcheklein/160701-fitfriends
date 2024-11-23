import { AppRoute, AuthStatus } from '../../../shared/const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAccessToken,
  getAuthorizationStatus,
  getIsSubmiting,
} from '../../../store/auth-process/selectors';
import { Navigate } from 'react-router-dom';
import { LoaderPage } from '../../base/loaders/loader-page/loader-page';
import { useCheckAuthQuery } from '../../../store/auth-process/auth-api';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setIsSubmitting } from '../../../store/auth-process/auth-process';

export const NoAuthRoute = (children: ReactNode) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getIsSubmiting);

  useEffect(() => {
    dispatch(setIsSubmitting(false));
  }, [location]);

  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthStatus.Auth;
  const isUnknown = authStatus === AuthStatus.Unknown;

  const accessToken = useAppSelector(getAccessToken);
  const { isLoading } = useCheckAuthQuery(undefined, {
    skip: !accessToken,
  });

  if (isLoading || isUnknown || isSubmitting) {
    return <LoaderPage />;
  }

  if (isAuth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return children;
};
