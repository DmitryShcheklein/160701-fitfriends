import { AppRoute, AuthStatus } from '../../../shared/const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAccessToken,
  getAuthorizationStatus,
  getIsSubmiting,
} from '../../../store/auth-process/selectors';
import { Navigate } from 'react-router-dom';
import { LoaderPage } from '../loaders/loader-page/loader-page';
import { useCheckAuthQuery } from '../../../store/auth-process/auth-api';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setIsSubmiting } from '../../../store/auth-process/auth-process';

type TNoAuthRoute = JSX.Element;

export const NoAuthRoute = (children: TNoAuthRoute) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getIsSubmiting);

  useEffect(() => {
    dispatch(setIsSubmiting(false));
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
