import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../name-space.enum';
import { baseQueryWithReauth } from '../../services/api';
import { BalanceRdo } from '@project/rdo';

export const balanceApi = createApi({
  reducerPath: NameSpace.BalanceApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'balance' }),
  tagTypes: [NameSpace.BalanceApi],
  endpoints: (builder) => ({
    getByTrainingId: builder.query<BalanceRdo[], string>({
      query: (trainingId) => ({
        url: trainingId,
        method: 'GET',
      }),
      providesTags: [NameSpace.BalanceApi],
    }),
    startTraining: builder.mutation<BalanceRdo, string>({
      query: (trainingId)=>({
        url: `${trainingId}/start`,
        method: 'POST'
      }),
      invalidatesTags: [NameSpace.BalanceApi]
    }),
    finishTraining: builder.mutation<BalanceRdo, string>({
      query: (trainingId)=>({
        url: `${trainingId}/finish`,
        method: 'POST'
      }),
      invalidatesTags: [NameSpace.BalanceApi]
    }),
  }),
});

export const { useGetByTrainingIdQuery, useStartTrainingMutation, useFinishTrainingMutation } = balanceApi;
