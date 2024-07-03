import Popup from '../../popup/popup';
import {
  fitnessLevelOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../user-info/user-info.data';
import Tag from '../../ui/tag/tag';
import RadioInput from '../../ui/RadioInput/RadioInput';
import {
  useCreateQestionnaireMutation,
  useGetQestionnaireQuery,
} from '../../../store/user-process/user-api';
import { toast } from 'react-toastify';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FitnessLevel, WorkoutDuration, WorkoutType } from '@project/enums';

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

  const [createConfig, { isLoading: isLoadingConfigMutation }] =
    useCreateQestionnaireMutation();
  const [trainingConfigData, setTrainingConfigData] = useState({
    [TrainingConfigFieldName.Level]:
      trainingConfig?.level || ('' as FitnessLevel),
    [TrainingConfigFieldName.Specialisation]:
      trainingConfig?.specialisation || ([] as WorkoutType[]),
    [TrainingConfigFieldName.Duration]:
      trainingConfig?.duration || ('' as WorkoutDuration),
    [TrainingConfigFieldName.CaloriesPerDay]: Number(
      trainingConfig?.caloriesPerDay
    ),
    [TrainingConfigFieldName.CaloriesWantLost]: Number(
      trainingConfig?.caloriesWantLost
    ),
    [TrainingConfigFieldName.TrainingReadiness]: Boolean(
      trainingConfig?.trainingReadiness
    ),
  });

  useEffect(() => {
    if (trainingConfig) {
      setTrainingConfigData(trainingConfig);
    }
  }, [trainingConfig]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const typeNumber = type === 'number';

    setTrainingConfigData((prev) => ({
      ...prev,
      [name]: typeNumber ? Number(value) : value,
    }));
  };
  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await createConfig(trainingConfigData).unwrap();

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
                      value={option.value}
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
