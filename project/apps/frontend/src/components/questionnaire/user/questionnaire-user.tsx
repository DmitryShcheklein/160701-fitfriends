import Popup from '../../popup/popup';
import {
  fitnessLevelOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../user-info/user-info.data';
import Tag from '../../ui/tag/tag';
import RadioInput from '../../ui/RadioInput/RadioInput';
import {
  useGetQestionnaireQuery,
  useUpdateQestionnaireMutation,
} from '../../../store/user-process/user-api';
import { toast } from 'react-toastify';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

enum TrainingConfigFieldName {
  Level = 'level',
  Specialisation = 'specialisation',
  TrainingReadiness = 'trainingReadiness',
  Duration = 'duration',
  CaloriesPerDay = 'caloriesPerDay',
  CaloriesWantLost = 'caloriesWantLost',
}

export const QuestionnaireUser = () => {
  const { data: trainingConfig, isLoading } = useGetQestionnaireQuery();
  console.log(trainingConfig);

  const [updateConfig, { isLoading: isLoadingConfigMutation }] =
    useUpdateQestionnaireMutation();
  const [trainingConfigData, setTrainingConfigData] = useState({
    [TrainingConfigFieldName.Level]: trainingConfig?.level,
    [TrainingConfigFieldName.Specialisation]: trainingConfig?.specialisation,
    [TrainingConfigFieldName.Duration]: trainingConfig?.duration,
    [TrainingConfigFieldName.CaloriesPerDay]: trainingConfig?.caloriesPerDay,
    [TrainingConfigFieldName.CaloriesWantLost]:
      trainingConfig?.caloriesWantLost,
    [TrainingConfigFieldName.TrainingReadiness]:
      trainingConfig?.trainingReadiness,
  });

  useEffect(() => {
    if (trainingConfig) {
      setTrainingConfigData(trainingConfig);
    }
  }, [trainingConfig]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTrainingConfigData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await updateConfig(trainingConfigData).unwrap();

      toast.success('Данные успешно сохранены!');
    } catch (err: any) {
      console.error('Failed to register: ', err);
      toast.error(err.data.message.join(''));
    }
  };

  if (isLoading) {
    return null;
  }
  return (
    <Popup isOpen showHead={false} className="popup-form--questionnaire-user">
      <div className="popup-form__form">
        <form onSubmit={handleSubmitForm}>
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
                      name={TrainingConfigFieldName.Specialisation}
                      value={option.value}
                      checked={Boolean(
                        trainingConfigData[
                          TrainingConfigFieldName.Specialisation
                        ]?.includes(option.value)
                      )}
                      onChange={handleInputChange}
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
                      name={TrainingConfigFieldName.Duration}
                      checked={
                        option.value ===
                        trainingConfigData[TrainingConfigFieldName.Duration]
                      }
                      onChange={handleInputChange}
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
                      name={TrainingConfigFieldName.Level}
                      value={option.value}
                      checked={
                        option.value ===
                        trainingConfigData[TrainingConfigFieldName.Level]
                      }
                      onChange={handleInputChange}
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
                        <input
                          type="number"
                          name={TrainingConfigFieldName.CaloriesWantLost}
                          onChange={handleInputChange}
                          value={String(
                            trainingConfigData[
                              TrainingConfigFieldName.CaloriesWantLost
                            ]
                          )}
                        />
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
                        <input
                          type="number"
                          name={TrainingConfigFieldName.CaloriesPerDay}
                          onChange={handleInputChange}
                          value={String(
                            trainingConfigData[
                              TrainingConfigFieldName.CaloriesPerDay
                            ]
                          )}
                        />
                        <span className="custom-input__text">ккал</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn questionnaire-user__button"
              type="submit"
              disabled={isLoadingConfigMutation}
            >
              Продолжить
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};
