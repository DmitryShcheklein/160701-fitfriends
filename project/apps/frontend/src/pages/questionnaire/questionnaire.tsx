import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import { QuestionnaireUser } from '../../components/forms/questionnaire/user/questionnaire-user';
import React from 'react';
import { QuestionnaireTrainer } from '../../components/forms/questionnaire/trainer/questionnaire-trainer';
import { useAuthRole } from '../../hooks/useAuth';

const QuestionnairePage = () => {
  const { isTrainerAuth, isUserAuth } = useAuthRole();

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Questionnaire')}</title>
      </Helmet>
      {isUserAuth ? <QuestionnaireUser /> : null}
      {isTrainerAuth ? <QuestionnaireTrainer /> : null}
    </>
  );
};

export default QuestionnairePage;
