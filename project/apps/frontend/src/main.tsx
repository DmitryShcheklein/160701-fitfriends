import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles/normalize.css';
import './styles/main.css';
import App from './app/app';
import { store } from './store';
import { authApi } from './store/auth-process/auth-api';

store.dispatch(authApi.endpoints.checkAuth.initiate());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
