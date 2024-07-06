import { createApi } from '@reduxjs/toolkit/query/react';
import { UserConfigRdo, UserRdo } from '@project/rdo';
import { baseQueryWithReauth } from '../../services/api';
import { NameSpace } from '../name-space.enum';
import { CreateUserConfigDto, UpdateUserConfigDto } from '@project/dto';

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
    User: builder.query<UserRdo, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: [NameSpace.UserApi],
    }),
    TrainingConfig: builder.query<UserConfigRdo, void>({
      query: () => ({
        url: '/questionnaire-user',
        method: 'GET',
      }),
      providesTags: [NameSpace.UserApi],
    }),
    createTrainingConfig: builder.mutation<UserConfigRdo, CreateUserConfigDto>({
      query: (credentials) => ({
        url: '/questionnaire-user',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.UserApi],
    }),
    updateTrainingConfig: builder.mutation<UserConfigRdo, UpdateUserConfigDto>({
      query: (credentials) => ({
        url: '/questionnaire-user',
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.UserApi],
    }),
  }),
});

export const {
  useUserQuery,
  useUpdateUserMutation,
  useCreateTrainingConfigMutation,
  useUpdateTrainingConfigMutation,
  useTrainingConfigQuery,
} = userApi;
