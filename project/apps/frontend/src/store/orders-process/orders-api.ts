import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../name-space.enum';
import { baseQueryWithReauth } from '../../services/api';
import { OrderRdo } from '@project/rdo';
import { CreateOrderDto } from '@project/dto';
import { OrdersWithPaginationRdo } from '@project/rdo';
import { OrdersQuery, OrdersTrainerQuery } from '@project/core';
import { OrdersWithPaginationTrainerRdo } from '../../../../../libs/rdo/src/lib/orders/orders-with-pagination-trainer.rdo';

export const ordersApi = createApi({
  reducerPath: NameSpace.OrdersApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'orders' }),
  tagTypes: [NameSpace.OrdersApi],
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderRdo, CreateOrderDto>({
      query: (data) => ({
        url: ``,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [NameSpace.OrdersApi],
    }),
    getOrdersUser: builder.query<OrdersWithPaginationRdo, OrdersQuery>({
      query: (params) => ({
        url: `user`,
        method: 'GET',
        params,
      }),
      providesTags: [NameSpace.OrdersApi],
    }),

    getOrdersByTrainerId: builder.query<
      OrdersWithPaginationTrainerRdo,
      OrdersTrainerQuery
    >({
      query: () => ({
        url: `trainer`,
        method: 'GET',
      }),
      providesTags: [NameSpace.OrdersApi],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersUserQuery,
  useGetOrdersByTrainerIdQuery,
} = ordersApi;
