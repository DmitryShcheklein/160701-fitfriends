import { createApi } from '@reduxjs/toolkit/query/react';
import { UserRdo } from '@project/rdo';
import { baseQueryWithReauth } from '../../services/api';
import { NameSpace } from '../name-space.enum';

export const userApi = createApi({
  reducerPath: NameSpace.UserApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'user' }),
  tagTypes: [NameSpace.UserApi], // Добавьте tagTypes
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserRdo, FormData>({
      query: (credentials) => ({
        url: '',
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.UserApi], // Инвалидация тегов
    }),
    getUser: builder.query<UserRdo, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: [NameSpace.UserApi], // Предоставление тегов
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
