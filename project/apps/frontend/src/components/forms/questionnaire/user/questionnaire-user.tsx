import Popup from '../../../ui/popup/popup';
import {
  fitnessLevelOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../../../shared/data';
import Tag from '../../../ui/tag/tag';
import RadioInput from '../../../ui/radio-input/radio-input';
import {
  useCreateTrainingConfigMutation,
  useGetTrainingConfigQuery,
} from '../../../../store/user-process/user-api';
import { toast } from 'react-toastify';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../../shared/const';
import { groupErrors } from '../../../../shared/helpers/groupErrors';
import { WorkoutType } from '@project/enums';

const FieldName = {
  Level: 'level',
  Specialisation: 'specialisation',
  Duration: 'duration',
  CaloriesPerDay: 'caloriesPerDay',
  CaloriesWantLost: 'caloriesWantLost',
} as const;

type FieldName = (typeof FieldName)[keyof typeof FieldName];
type TState = Record<FieldName, any>;

export const QuestionnaireUser = () => {
  const navigate = useNavigate();
  const { data: trainingConfig, isLoading } = useGetTrainingConfigQuery();
  const [createConfig, { isLoading: isLoadingConfigMutation }] =
    useCreateTrainingConfigMutation();
  const [trainingConfigData, setTrainingConfigData] = useState<TState>({
    level: trainingConfig?.level || '',
    specialisation: trainingConfig?.specialisation || [],
    duration: trainingConfig?.duration || '',
    caloriesPerDay: Number(trainingConfig?.caloriesPerDay),
    caloriesWantLost: Number(trainingConfig?.caloriesWantLost),
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

    if (typeNumber) {
      setTrainingConfigData((prev) => ({
        ...prev,
        [name]: Number(value) || '',
      }));
      return;
    }
    setTrainingConfigData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, readOnly } = evt.target;
    if (!readOnly) {
      setTrainingConfigData((prev) => {
        const currentSpecialisation = prev.specialisation;
        const value = evt.target.value as WorkoutType;
        return {
          ...prev,
          specialisation: checked
            ? currentSpecialisation?.concat([value])
            : currentSpecialisation?.filter((item) => item !== value),
        };
      });
    }
  };

  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await createConfig(trainingConfigData).unwrap();

      toast.success('Данные успешно сохранены!');
      navigate(AppRoute.Index);
    } catch (err: any) {
      console.error('Failed to register: ', err);

      const groupedErrors = groupErrors(err.data.message);
      Object.keys(groupedErrors).forEach((key) => {
        const errorMessage = groupedErrors[key].join('\n');
        toast.error(errorMessage, {
          style: { whiteSpace: 'pre-line' },
          autoClose: 5_000,
        });
      });
    }
  };

  if (isLoading) {
    return null;
  }
  return (
    <Popup isStatic showHead={false} className="popup-form--questionnaire-user">
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
                      name={FieldName.Specialisation}
                      value={option.value}
                      checked={Boolean(
                        trainingConfigData[FieldName.Specialisation]?.includes(
                          option.value
                        )
                      )}
                      onChange={handleSpecializationChange}
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
                      name={FieldName.Duration}
                      value={option.value}
                      checked={
                        option.value === trainingConfigData[FieldName.Duration]
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
                      name={FieldName.Level}
                      value={option.value}
                      checked={
                        option.value === trainingConfigData[FieldName.Level]
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
                          name={FieldName.CaloriesWantLost}
                          onChange={handleInputChange}
                          value={String(
                            trainingConfigData[FieldName.CaloriesWantLost]
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
                          name={FieldName.CaloriesPerDay}
                          onChange={handleInputChange}
                          value={trainingConfigData[FieldName.CaloriesPerDay]}
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
