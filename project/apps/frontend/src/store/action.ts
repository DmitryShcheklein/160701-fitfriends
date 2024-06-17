import { createAction } from '@reduxjs/toolkit';
// import { PUBLIC_URL } from 'src/const';
const PUBLIC_URL = 'http://localhost:4200/';

const REDIRECT_TO_ROUTE = 'app/redirectToRoute';
const redirectToRoute = createAction(REDIRECT_TO_ROUTE, (payload: string) => ({
  payload: `${PUBLIC_URL}/${payload}`,
}));

export { redirectToRoute, REDIRECT_TO_ROUTE };
