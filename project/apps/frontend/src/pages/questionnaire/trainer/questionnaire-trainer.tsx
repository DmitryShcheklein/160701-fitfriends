import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../../shared/const';
import { QuestionnaireTrainer } from '../../../components/forms/questionnaire/trainer/questionnaire-trainer';

export const QuestionnaireTrainerPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('QuestionnaireTrainer')}</title>
      </Helmet>

      <QuestionnaireTrainer />
    </>
  );
};
