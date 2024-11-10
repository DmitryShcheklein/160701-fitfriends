import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from './api.const';
import { TState } from '../types/state';
import { StatusCodes } from 'http-status-codes';
import { logOut, setCredentials } from '../store/auth-process/auth-process';

import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const createBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as TState).auth.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  });
};

const createRefreshQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/${baseUrl}`,
  });
};

export const baseQueryWithReauth =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  > =>
  async (args, api, extraOptions) => {
    const baseQuery = createBaseQuery(baseUrl);
    const refreshQuery = createRefreshQuery(baseUrl);
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === StatusCodes.UNAUTHORIZED) {
      const refreshToken = (api.getState() as TState).auth.refreshToken;
      if (refreshToken) {
        const refreshResult = await refreshQuery(
          {
            url: `${BACKEND_URL}/auth/refresh`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult?.data) {
          api.dispatch(setCredentials(refreshResult.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } else {
        api.dispatch(logOut());
      }
    }

    return result;
  };
