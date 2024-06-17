import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './name-space.enum';
import authReducer from './auth-process/auth-process';
import { authApi } from './auth-process/auth-api';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});
