import { createApi } from '@reduxjs/toolkit/query/react';
import { TrainingRdo, TrainingsWithPaginationRdo } from '@project/rdo';
import { baseQueryWithReauth } from '../../services/api';
import { NameSpace } from '../name-space.enum';
import { TrainingsQuery } from '@project/core';

export const trainingApi = createApi({
  reducerPath: NameSpace.TrainingApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'trainings' }),
  tagTypes: [NameSpace.TrainingApi],
  endpoints: (builder) => ({
    createTraining: builder.mutation<TrainingRdo, FormData>({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.TrainingApi],
    }),
    getTrainings: builder.query<TrainingsWithPaginationRdo, TrainingsQuery>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
      providesTags: [NameSpace.TrainingApi],
    }),
    getSpecialTrainings: builder.query<TrainingRdo[], unknown>({
      query: () => ({
        url: '/special',
        method: 'GET',
      }),
    }),
    getRecommendedTrainings: builder.query<TrainingRdo[], unknown>({
      query: () => ({
        url: '/recommended',
        method: 'GET',
      }),
    }),
    getPopularTrainings: builder.query<TrainingRdo[], unknown>({
      query: () => ({
        url: '/popular',
        method: 'GET',
      }),
    }),
    getTrainingById: builder.query<TrainingRdo, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: [NameSpace.TrainingApi],
    }),
    updateTraining: builder.mutation<
      TrainingRdo,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [NameSpace.TrainingApi],
    }),
    deleteTraining: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [NameSpace.TrainingApi],
    }),
  }),
});

export const {
  useCreateTrainingMutation,
  useUpdateTrainingMutation,
  useGetTrainingsQuery,
  useGetTrainingByIdQuery,
  useDeleteTrainingMutation,

  useGetSpecialTrainingsQuery,
  useGetPopularTrainingsQuery,
  useGetRecommendedTrainingsQuery,
} = trainingApi;
