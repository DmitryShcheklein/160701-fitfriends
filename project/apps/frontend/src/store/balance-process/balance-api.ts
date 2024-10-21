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
  }),
});

export const { useGetByTrainingIdQuery } = balanceApi;
