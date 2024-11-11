import { Helmet } from 'react-helmet-async';

import { getPageTitle } from '../../shared/const';

import RegisterForm from '../../components/forms/register-form/register-form';
import React from 'react';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('Register')}</title>
      </Helmet>

      <RegisterForm />
    </>
  );
};

export default RegisterPage;
