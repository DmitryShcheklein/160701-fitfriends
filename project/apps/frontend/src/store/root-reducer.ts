import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './name-space.enum';
import authReducer from './auth-process/auth-slice';
import { authApi } from './auth-process/auth-api';
import { userApi } from './user-process/user-api';
import { trainingApi } from './training-process/training-api';
import { commentsApi } from './comments-process/comments-api';
import { ordersApi } from './orders-process/orders-api';
import { balanceApi } from './balance-process/balance-api';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [trainingApi.reducerPath]: trainingApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [balanceApi.reducerPath]: balanceApi.reducer,
});
