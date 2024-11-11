import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import React from 'react';
import { CreateTrainingForm } from '../../components/forms/create-training/create-training';

export const CreateTrainingPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('CreateTraining')}</title>
      </Helmet>

      <CreateTrainingForm />
    </>
  );
};
