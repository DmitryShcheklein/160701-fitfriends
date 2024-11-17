import Popup from '../../../ui/popup/popup';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../shared/const';
import {
  fitnessLevelOptions,
  specializationOptions,
} from '../../../../shared/data';
import RadioInput from '../../../ui/radio-input/radio-input';
import Tag from '../../../ui/tag/tag';

export const QuestionnaireTrainer = () => {
  return (
    <Popup
      isStatic
      showHead={false}
      className="popup-form--questionnaire-coach"
    >
      <div className="popup-form__form">
        <form method="get">
          <div className="questionnaire-coach">
            <h1 className="visually-hidden">Опросник</h1>
            <div className="questionnaire-coach__wrapper">
              <div className="questionnaire-coach__block">
                <span className="questionnaire-coach__legend">
                  Ваша специализация (тип) тренировок
                </span>
                <div className="specialization-checkbox questionnaire-coach__specializations">
                  {specializationOptions.map((option) => (
                    <Tag
                      size="big"
                      key={option.value}
                      label={option.label}
                      // name={FieldName.Specialisation}
                      value={option.value}
                      // checked={Boolean(
                      //   trainingConfigData[FieldName.Specialisation]?.includes(
                      //     option.value
                      //   )
                      // )}
                      // onChange={handleSpecializationChange}
                    />
                  ))}
                </div>
              </div>
              <div className="questionnaire-coach__block">
                <span className="questionnaire-coach__legend">Ваш уровень</span>
                <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                  {fitnessLevelOptions.map((option) => (
                    <RadioInput
                      key={option.value}
                      label={option.label}
                      // name={FieldName.Level}
                      value={option.value}
                      // checked={
                      //   option.value === trainingConfigData[FieldName.Level]
                      // }
                      // onChange={handleInputChange}
                    />
                  ))}
                </div>
              </div>
              <div className="questionnaire-coach__block">
                <span className="questionnaire-coach__legend">
                  Ваши дипломы и сертификаты
                </span>
                <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                  <label>
                    <span className="drag-and-drop__label" tabIndex={0}>
                      Загрузите сюда файлы формата PDF, JPG или PNG
                      <svg width="20" height="20" aria-hidden="true">
                        <use xlinkHref="#icon-import"></use>
                      </svg>
                    </span>
                    <input
                      type="file"
                      name="import"
                      tabIndex={-1}
                      accept=".pdf, .jpg, .png"
                    />
                  </label>
                </div>
              </div>
              <div className="questionnaire-coach__block">
                <span className="questionnaire-coach__legend">
                  Расскажите о своём опыте, который мы сможем проверить
                </span>
                <div className="custom-textarea questionnaire-coach__textarea">
                  <label>
                    <textarea name="description" placeholder=" "></textarea>
                  </label>
                </div>
                <div className="questionnaire-coach__checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="individual-training"
                      name="individual-training"
                      checked
                    />
                    <span className="questionnaire-coach__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="questionnaire-coach__checkbox-label">
                      Хочу дополнительно индивидуально тренировать
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button className="btn questionnaire-coach__button" type="submit">
              Продолжить
            </button>
            <Link
              className="btn btn--small btn--outlined sign-in__button"
              to={AppRoute.Index}
            >
              Продолжить без сохранения
            </Link>
          </div>
        </form>
      </div>
    </Popup>
  );
};
