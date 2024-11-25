import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../name-space.enum';
import { baseQueryWithReauth } from '../../services/api';
import { OrderRdo } from '@project/rdo';
import { CreateOrderDto } from '@project/dto';
import { OrdersWithPaginationRdo } from '@project/rdo';
import { OrdersQuery } from '@project/core';

export const ordersApi = createApi({
  reducerPath: NameSpace.OrdersApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'orders' }),
  tagTypes: [NameSpace.OrdersApi],
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      OrderRdo,
      CreateOrderDto & { trainingId: string }
    >({
      query: (credentials) => ({
        url: ``,
        method: 'POST',
        body: {
          trainingId: credentials.trainingId,
          quantity: credentials.quantity,
          paymentType: credentials.paymentType,
        },
      }),
      invalidatesTags: [NameSpace.OrdersApi],
    }),
    getOrders: builder.query<OrdersWithPaginationRdo, OrdersQuery>({
      query: (params) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: [NameSpace.OrdersApi],
    }),

    getOrdersByTrainingsIds: builder.query<OrderRdo[], string[] | undefined>({
      query: (params) => ({
        url: `trainingsIds`,
        method: 'GET',
        params: { ids: params },
      }),
      providesTags: [NameSpace.OrdersApi],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrdersByTrainingsIdsQuery,
} = ordersApi;
