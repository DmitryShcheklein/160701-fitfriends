import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

const withStore =
  (component: () => React.ReactNode): FC =>
  () => {
    return <Provider store={store}>{component()}</Provider>;
  };

export default withStore;
