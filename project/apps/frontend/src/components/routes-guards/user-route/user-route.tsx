import { ReactNode } from 'react';
import { useAuthRole } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';

export const UserRoute = (children: ReactNode) => {
  const { isUserAuth } = useAuthRole();

  if (!isUserAuth) {
    return <Navigate to={AppRoute.Page403} />;
  }
  return isUserAuth ? children : null;
};
