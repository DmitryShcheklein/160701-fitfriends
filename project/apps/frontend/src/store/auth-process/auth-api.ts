import { createApi } from '@reduxjs/toolkit/query/react';
import { TokenPayload } from '@project/core';
import { LoggedUserRdo, RegisteredUserRdo } from '@project/rdo';
import { LoginUserDto } from '@project/dto';
import { baseQueryWithReauth } from '../../services/api';
import { NameSpace } from '../name-space.enum';

export const authApi = createApi({
  reducerPath: NameSpace.AuthApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'auth' }),
  tagTypes: [NameSpace.AuthApi],
  endpoints: (builder) => ({
    login: builder.mutation<LoggedUserRdo, LoginUserDto>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisteredUserRdo, FormData>({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    checkAuth: builder.query<TokenPayload, void>({
      query: () => ({
        url: 'check',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useCheckAuthQuery, useRegisterMutation } =
  authApi;
