import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPayload, User } from '@project/core';
import { AuthStatus } from '../../shared/const';
import { NameSpace } from '../name-space.enum';
import {
  getToken,
  removeToken,
  setToken,
  TOKEN_KEY_NAME,
} from '../../services/token';
import { authApi } from './auth-api';

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
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.checkAuth.matchFulfilled,
      (state, action: PayloadAction<TokenPayload>) => {
        const { email } = action.payload;

        state.authorizationStatus = AuthStatus.Auth;
        state.user = { email };
      }
    );
    builder.addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) =>
      authSlice.caseReducers.logOut(state)
    );
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
