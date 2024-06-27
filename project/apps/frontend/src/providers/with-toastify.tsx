import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const withToastify =
  (component: () => React.ReactNode): FC =>
  () => {
    return (
      <>
        <ToastContainer />
        {component()}
      </>
    );
  };

export default withToastify;
