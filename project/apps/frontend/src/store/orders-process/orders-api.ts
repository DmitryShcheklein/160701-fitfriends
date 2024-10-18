import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../name-space.enum';
import { baseQueryWithReauth } from '../../services/api';
import { OrderRdo } from '@project/rdo';
import { CreateOrderDto } from '@project/dto';

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
    getOrders: builder.query<OrderRdo[], void>({
      query: () => ({
        url: ``,
        method: 'GET',
      }),
      providesTags: [NameSpace.OrdersApi],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi;
