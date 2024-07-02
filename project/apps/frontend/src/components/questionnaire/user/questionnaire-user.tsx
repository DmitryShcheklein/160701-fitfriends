import Popup from '../../popup/popup';
import {
  fitnessLevelOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../user-info/user-info.data';
import Tag from '../../ui/tag/tag';
import RadioInput from '../../ui/RadioInput/RadioInput';

export const QuestionnaireUser = () => {
  return (
    <Popup isOpen showHead={false} className="popup-form--questionnaire-user">
      <div className="popup-form__form">
        <form method="get">
          <div className="questionnaire-user">
            <h1 className="visually-hidden">Опросник</h1>
            <div className="questionnaire-user__wrapper">
              <div className="questionnaire-user__block">
                <span className="questionnaire-user__legend">
                  Ваша специализация (тип) тренировок
                </span>
                <div className="specialization-checkbox questionnaire-user__specializations">
                  {specializationOptions.map((option) => (
                    <Tag
                      size="big"
                      key={option.value}
                      label={option.label}
                      name="specialisation"
                      value={option.value}
                      checked={false}
                      onChange={() => {}}
                    />
                  ))}
                </div>
              </div>
              <div className="questionnaire-user__block">
                <span className="questionnaire-user__legend">
                  Сколько времени вы готовы уделять на тренировку в день
                </span>
                <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                  {workoutDurationOptions.map((option) => (
                    <RadioInput
                      key={option.value}
                      label={option.label}
                      name="time"
                      value={option.value}
                    />
                  ))}
                </div>
              </div>
              <div className="questionnaire-user__block">
                <span className="questionnaire-user__legend">Ваш уровень</span>
                <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                  {fitnessLevelOptions.map((option) => (
                    <RadioInput
                      key={option.value}
                      label={option.label}
                      name="level"
                      value={option.value}
                    />
                  ))}
                </div>
              </div>
              <div className="questionnaire-user__block">
                <div className="questionnaire-user__calories-lose">
                  <span className="questionnaire-user__legend">
                    Сколько калорий хотите сбросить
                  </span>
                  <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                    <label>
                      <span className="custom-input__wrapper">
                        <input type="number" name="calories-lose" />
                        <span className="custom-input__text">ккал</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="questionnaire-user__calories-waste">
                  <span className="questionnaire-user__legend">
                    Сколько калорий тратить в день
                  </span>
                  <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                    <label>
                      <span className="custom-input__wrapper">
                        <input type="number" name="calories-waste" />
                        <span className="custom-input__text">ккал</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn questionnaire-user__button" type="submit">
              Продолжить
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};
