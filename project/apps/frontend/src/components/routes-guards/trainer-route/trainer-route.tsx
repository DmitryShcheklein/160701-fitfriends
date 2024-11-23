import { ReactNode } from 'react';
import { useAuthRole } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../../shared/const';

export const TrainerRoute = (children: ReactNode) => {
  const { isTrainerAuth } = useAuthRole();

  if (!isTrainerAuth) {
    return <Navigate to={AppRoute.Page403} />;
  }
  return isTrainerAuth ? children : null;
};
