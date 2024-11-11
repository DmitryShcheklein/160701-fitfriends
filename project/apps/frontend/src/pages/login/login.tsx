import { Helmet } from 'react-helmet-async';

import { getPageTitle } from '../../shared/const';

import LoginForm from '../../components/forms/login-form/login-form';
import React from 'react';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('Login')}</title>
      </Helmet>

      <LoginForm />
    </>
  );
};

export default LoginPage;
