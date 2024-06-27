import { createApi } from '@reduxjs/toolkit/query/react';
import { UserRdo } from '@project/rdo';
import { UpdateUserDto } from '@project/dto';
import { baseQueryWithReauth } from '../../services/api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth({ baseUrl: 'user' }),
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserRdo, UpdateUserDto>({
      query: (credentials) => ({
        url: '',
        method: 'PATCH',
        body: credentials,
      }),
    }),
    getUser: builder.query<UserRdo, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
