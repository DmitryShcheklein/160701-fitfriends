import { Middleware } from '@reduxjs/toolkit';
import { logOut } from '../auth-process/auth-process';
import { userApi } from '../user-process/user-api';

export const apiResetMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (action.type === logOut.type) {
      store.dispatch(userApi.util.resetApiState()); // Сброс кэша userApi при logOut
    }

    return next(action);
  };
