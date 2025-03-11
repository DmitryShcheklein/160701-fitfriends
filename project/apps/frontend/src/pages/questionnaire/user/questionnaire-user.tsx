import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../../shared/const';
import { QuestionnaireUser } from '../../../components/forms/questionnaire/user/questionnaire-user';

export const QuestionnaireUserPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('QuestionnaireUser')}</title>
      </Helmet>
      <QuestionnaireUser />
    </>
  );
};
