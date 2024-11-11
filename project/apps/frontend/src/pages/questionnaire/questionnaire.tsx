import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import { QuestionnaireUser } from '../../components/forms/questionnaire/user/questionnaire-user';
import React from 'react';
import { QuestionnaireTrainer } from '../../components/forms/questionnaire/trainer/questionnaire-trainer';

const QuestionnairePage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('Questionnaire')}</title>
      </Helmet>
      {!!0 ? <QuestionnaireUser /> : null}
      {!!1 ? <QuestionnaireTrainer /> : null}
    </>
  );
};

export default QuestionnairePage;
