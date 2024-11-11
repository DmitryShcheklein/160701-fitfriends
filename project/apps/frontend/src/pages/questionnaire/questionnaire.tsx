import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import { QuestionnaireUser } from '../../components/forms/questionnaire/user/questionnaire-user';
import React from 'react';

const QuestionnairePage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('Questionnaire')}</title>
      </Helmet>
      <QuestionnaireUser />
    </>
  );
};

export default QuestionnairePage;
