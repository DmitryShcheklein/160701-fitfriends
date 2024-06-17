import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@project/core';
import { AuthStatus } from '../../shared/const';
import { NameSpace } from '../name-space.enum';
import {
  getToken,
  removeToken,
  setToken,
  TOKEN_KEY_NAME,
} from '../../services/token';

export type TInitialState = {
  authorizationStatus: AuthStatus;
  user: Pick<User, 'email'> | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export const initialState: TInitialState = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
  accessToken: getToken(TOKEN_KEY_NAME.Access),
  refreshToken: getToken(TOKEN_KEY_NAME.Refresh),
};

const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    setCredentials: (state, action) => {
      const { email, accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = { email };
      state.authorizationStatus = AuthStatus.Auth;

      setToken(TOKEN_KEY_NAME.Access, accessToken);
      setToken(TOKEN_KEY_NAME.Refresh, refreshToken);
    },
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.authorizationStatus = AuthStatus.NoAuth;

      removeToken(TOKEN_KEY_NAME.Access);
      removeToken(TOKEN_KEY_NAME.Refresh);
    },
  },
});

export const { setAuthorizationStatus, setUserData, setCredentials, logOut } =
  authSlice.actions;

export default authSlice.reducer;
