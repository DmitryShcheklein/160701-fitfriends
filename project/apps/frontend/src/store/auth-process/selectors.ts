import { TState } from '../../types/state';
import { NameSpace } from '../name-space.enum';

export const getAuthorizationStatus = (state: TState) =>
  state[NameSpace.Auth].authorizationStatus;
export const getUser = (state: TState) => state[NameSpace.Auth].user;
export const getAccessToken = (state: TState) =>
  state[NameSpace.Auth].accessToken;
export const getRefreshToken = (state: TState) =>
  state[NameSpace.Auth].refreshToken;
