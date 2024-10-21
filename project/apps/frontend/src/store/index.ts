import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';
import { authApi } from './auth-process/auth-api';
import { userApi } from './user-process/user-api';
import { trainingApi } from './training-process/training-api';
import { commentsApi } from './comments-process/comments-api';
import { ordersApi } from './orders-process/orders-api';
import { balanceApi } from './balance-process/balance-api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(redirect)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(trainingApi.middleware)
      .concat(commentsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(balanceApi.middleware),
});

export { store };
