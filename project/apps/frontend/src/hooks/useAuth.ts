import { useAppSelector } from './index';
import { getUserRole } from '../store/auth-process/selectors';

export const useAuthRole = () => {
  const role = useAppSelector(getUserRole);

  return { isUserAuth: role === 'user', isTrainerAuth: role === 'trainer' };
};
