import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';
import { authApi } from './auth-process/auth-api';
import { userApi } from './user-process/user-api';
import { trainingApi } from './training-process/training-api';
import { commentsApi } from './comments-process/comments-api';
import { ordersApi } from './orders-process/orders-api';
import { balanceApi } from './balance-process/balance-api';
import { apiResetMiddleware } from './middlewares/api-reset';
import { friendsApi } from './friends-process/friends-api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiResetMiddleware)
      .concat(redirect)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(trainingApi.middleware)
      .concat(commentsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(balanceApi.middleware)
      .concat(friendsApi.middleware),
});

export { store };

setupListeners(store.dispatch);
