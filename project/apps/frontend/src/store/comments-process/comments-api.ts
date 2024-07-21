import { createApi } from '@reduxjs/toolkit/query/react';
import { CommentRdo } from '@project/rdo';
import { baseQueryWithReauth } from '../../services/api';
import { NameSpace } from '../name-space.enum';

export const commentsApi = createApi({
  reducerPath: NameSpace.CommentsApi,
  baseQuery: baseQueryWithReauth({ baseUrl: '' }),
  tagTypes: [NameSpace.CommentsApi],
  endpoints: (builder) => ({
    createComment: builder.mutation<CommentRdo, FormData>({
      query: (credentials) => ({
        url: `trainings/comments`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [NameSpace.CommentsApi],
    }),
    getCommentsByTrainingId: builder.query<CommentRdo[], string>({
      query: (trainingId) => ({
        url: `trainings/${trainingId}/comments`,
        method: 'GET',
      }),
      providesTags: [NameSpace.CommentsApi],
    }),

    getCommentById: builder.query<CommentRdo, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'GET',
      }),
      providesTags: [NameSpace.CommentsApi],
    }),
    updateComment: builder.mutation<CommentRdo, { id: string; data: FormData }>(
      {
        query: ({ id, data }) => ({
          url: `comments/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: [NameSpace.CommentsApi],
      }
    ),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [NameSpace.CommentsApi],
    }),
  }),
});

export const { useGetCommentsByTrainingIdQuery } = commentsApi;
