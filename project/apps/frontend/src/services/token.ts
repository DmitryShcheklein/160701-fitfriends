export enum TOKEN_KEY_NAME {
  Access = 'fitFriends-access',
  Refresh = 'fitFriends-refresh',
}

export type Token = string;

export const getToken = (key: TOKEN_KEY_NAME): Token => {
  const token = localStorage.getItem(key);

  return token ?? '';
};

export const setToken = (key: TOKEN_KEY_NAME, token: Token) => {
  localStorage.setItem(key, token);
};

export const removeToken = (key: TOKEN_KEY_NAME): void => {
  localStorage.removeItem(key);
};
