import { createApi } from '@reduxjs/toolkit/query/react';
import { NameSpace } from '../name-space.enum';
import { baseQueryWithReauth } from '../../services/api';
import { FriendStatusRdo, FriendsWithPaginationRdo } from '@project/rdo';
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
    checkExistFriend: builder.query<FriendStatusRdo, string>({
      query: (friendId) => ({
        url: `/check/${friendId}`,
        method: 'GET',
      }),
      providesTags: [NameSpace.FriendsApi],
    }),
    addFriend: builder.mutation({
      query: (friendId) => ({
        url: `${friendId}`,
        method: 'POST',
      }),
      invalidatesTags: [NameSpace.FriendsApi],
    }),
    deleteFriend: builder.mutation({
      query: (friendId) => ({
        url: `${friendId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [NameSpace.FriendsApi],
    }),
  }),
});

export const {
  useGetUserFriendsQuery,
  useCheckExistFriendQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
} = friendsApi;
