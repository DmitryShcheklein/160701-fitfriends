import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import { QuestionnaireUser } from '../../components/forms/questionnaire/user/questionnaire-user';

const QuestionnairePage = () => {
  return (
    <>
      <Helmet>
        <title>{PageTitles.Questionnaire}</title>
      </Helmet>
      <QuestionnaireUser />
    </>
  );
};

export default QuestionnairePage;
