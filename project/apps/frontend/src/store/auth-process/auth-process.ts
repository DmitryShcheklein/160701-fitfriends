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
  user: Pick<User, 'email' | 'role'> | null;
  accessToken: string | null;
  refreshToken: string | null;
  isSubmitting: boolean;
};

export const initialState: TInitialState = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
  accessToken: getToken(TOKEN_KEY_NAME.Access),
  refreshToken: getToken(TOKEN_KEY_NAME.Refresh),
  isSubmitting: false,
};

const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    setIsSubmiting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setCredentials: (state, action) => {
      const { email, role, accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = { email, role };
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
        const { email, role } = action.payload;

        state.authorizationStatus = AuthStatus.Auth;
        state.user = { email, role };
      }
    );
    builder.addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) =>
      authSlice.caseReducers.logOut(state)
    );
  },
});

export const { setCredentials, logOut, setIsSubmiting } = authSlice.actions;

export default authSlice.reducer;
