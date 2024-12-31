import { createApi } from '@reduxjs/toolkit/query/react';
import { UserConfigRdo, UserRdo, UsersWithPaginationRdo } from '@project/rdo';
import { baseQueryWithReauth } from '../../services/api';
import { NameSpace } from '../name-space.enum';
import { CreateUserConfigDto, UpdateUserConfigDto } from '@project/dto';
import { UsersQuery } from '@project/core';

export const userApi = createApi({
  reducerPath: NameSpace.UserApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'user' }),
  tagTypes: [NameSpace.UserApi],
  endpoints: (builder) => ({
    updateUser: builder.mutation<UserRdo, FormData>({
      query: (credentials) => ({
        url: '',
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.UserApi],
    }),
    getCurrentUser: builder.query<UserRdo, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: [NameSpace.UserApi],
    }),
    getAllUsers: builder.query<UsersWithPaginationRdo, UsersQuery>({
      query: (params) => ({
        url: '/all',
        method: 'GET',
        params,
      }),
      providesTags: [NameSpace.UserApi],
    }),
    getUserById: builder.query<UserRdo, string>({
      query: (userId) => ({
        url: `/info/${userId}`,
        method: 'GET',
      }),
      providesTags: [NameSpace.UserApi],
    }),
    getTrainingConfig: builder.query<UserConfigRdo, void>({
      query: () => ({
        url: '/questionnaire',
        method: 'GET',
      }),
      providesTags: [NameSpace.UserApi],
    }),
    createTrainingConfig: builder.mutation<UserConfigRdo, CreateUserConfigDto>({
      query: (credentials) => ({
        url: '/questionnaire',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.UserApi],
    }),
    updateTrainingConfig: builder.mutation<UserConfigRdo, UpdateUserConfigDto>({
      query: (credentials) => ({
        url: '/questionnaire',
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.UserApi],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useCreateTrainingConfigMutation,
  useUpdateTrainingConfigMutation,
  useGetTrainingConfigQuery,
  useGetAllUsersQuery,
} = userApi;
