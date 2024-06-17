import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

const withHelmet =
  (component: () => React.ReactNode): FC =>
  () => {
    return <HelmetProvider>{component()}</HelmetProvider>;
  };

export default withHelmet;
