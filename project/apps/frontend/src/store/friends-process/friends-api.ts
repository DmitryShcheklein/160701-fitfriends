import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../name-space.enum';
import { baseQueryWithReauth } from '../../services/api';
import { FriendsWithPaginationRdo } from '@project/rdo';
import { FriendsQuery } from '@project/core';

export const friendsApi = createApi({
  reducerPath: NameSpace.FriendsApi,
  baseQuery: baseQueryWithReauth({ baseUrl: 'friends' }),
  tagTypes: [NameSpace.FriendsApi],
  endpoints: (builder) => ({
    getUserFriends: builder.query<FriendsWithPaginationRdo, FriendsQuery>({
      query: (params) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: [NameSpace.FriendsApi],
    }),
  }),
});

export const { useGetUserFriendsQuery } = friendsApi;
