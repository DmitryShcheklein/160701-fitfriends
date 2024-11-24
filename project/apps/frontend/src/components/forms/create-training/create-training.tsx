import Popup from '../../ui/popup/popup';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { AppRoute } from '../../../shared/const';
import { groupErrors } from '../../../shared/helpers/groupErrors';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateTrainingMutation } from '../../../store/training-process/training-api';
import Textarea from '../../ui/textarea/textarea';
import CustomSelect from '../../ui/select/select';
import {
  fitnessLevelOptions,
  genderOptions,
  specializationOptions,
  workoutDurationOptions,
} from '../../../shared/data';
import { FitnessLevel, WorkoutDuration, WorkoutType } from '@project/enums';
import RadioInput from '../../ui/radio-input/radio-input';

const FormFieldName = {
  name: 'name',
  trainingType: 'trainingType',
  level: 'level',
  duration: 'duration',
  price: 'price',
  calories: 'calories',
  description: 'description',
  gender: 'gender',
  video: 'video',
} as const;
type FieldName = (typeof FormFieldName)[keyof typeof FormFieldName];
type TState = Record<FieldName, any>;

export const CreateTrainingForm = () => {
  const navigate = useNavigate();
  const [createTraining, { isLoading: isLoadingCreateTraining }] =
    useCreateTrainingMutation();

  const [formData, setFormData] = useState<TState>({
    name: '',
    description: '',
    calories: undefined,
    price: undefined,
    trainingType: undefined,
    level: undefined,
    gender: undefined,
    video: undefined,
    duration: undefined,
  });

  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          form.append(key, value);
        }
      });

      const training = await createTraining(form).unwrap();

      toast.success('Тренировка успешно создана!');
      navigate(`${AppRoute.TrainingCardPage}/${training.id}`);
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const typeNumber = type === 'number';

    if (typeNumber) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value) || '',
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = evt.target;

    if (files) {
      const [file] = Array.from(files);
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  };

  return (
    <Popup
      isStatic
      isPortable={false}
      title="Создание тренировки"
      className="popup-form popup-form--create-training"
    >
      <div className="popup-form__form">
        <form onSubmit={handleSubmitForm}>
          <div className="create-training">
            <div className="create-training__wrapper">
              <div className="create-training__block">
                <h2 className="create-training__legend">Название тренировки</h2>
                <div className="custom-input create-training__input">
                  <label>
                    <span className="custom-input__wrapper">
                      <input
                        type="text"
                        name={FormFieldName.name}
                        onChange={handleInputChange}
                      />
                    </span>
                  </label>
                </div>
              </div>
              <div className="create-training__block">
                <h2 className="create-training__legend">
                  Характеристики тренировки
                </h2>
                <div className="create-training__info">
                  <div className="custom-select custom-select--not-selected">
                    <CustomSelect
                      className="user-info__select"
                      name={FormFieldName.trainingType}
                      label="Выберите тип тренировки"
                      value={specializationOptions.find(
                        (el) => el.value === formData?.duration
                      )}
                      onChange={(newValue: {
                        name: string;
                        value: WorkoutType;
                      }) => {
                        setFormData({
                          ...formData,
                          trainingType: newValue.value,
                        });
                      }}
                      options={specializationOptions}
                      menuPlacement="auto"
                    />
                  </div>
                  <div className="custom-input custom-input--with-text-right">
                    <label>
                      <span className="custom-input__label">
                        Сколько калорий потратим
                      </span>
                      <span className="custom-input__wrapper">
                        <input
                          type="number"
                          name={FormFieldName.calories}
                          onChange={handleInputChange}
                        />
                        <span className="custom-input__text">ккал</span>
                      </span>
                    </label>
                  </div>
                  <div className="custom-select custom-select--not-selected">
                    <CustomSelect
                      className="user-info__select"
                      name={FormFieldName.duration}
                      label="Сколько времени потратим"
                      value={workoutDurationOptions.find(
                        (el) => el.value === formData?.duration
                      )}
                      onChange={(newValue: {
                        name: string;
                        value: WorkoutDuration;
                      }) => {
                        setFormData({
                          ...formData,
                          duration: newValue.value,
                        });
                      }}
                      options={workoutDurationOptions}
                      menuPlacement="auto"
                    />
                  </div>
                  <div className="custom-input custom-input--with-text-right">
                    <label>
                      <span className="custom-input__label">
                        Стоимость тренировки
                      </span>
                      <span className="custom-input__wrapper">
                        <input
                          type="number"
                          name={FormFieldName.price}
                          onChange={handleInputChange}
                        />
                        <span className="custom-input__text">₽</span>
                      </span>
                    </label>
                  </div>
                  <div className="custom-select custom-select--not-selected">
                    <CustomSelect
                      className="user-info__select"
                      name={FormFieldName.level}
                      label="Выберите уровень тренировки"
                      value={fitnessLevelOptions.find(
                        (el) => el.value === formData?.level
                      )}
                      onChange={(newValue: {
                        name: string;
                        value: FitnessLevel;
                      }) => {
                        setFormData({
                          ...formData,
                          level: newValue.value,
                        });
                      }}
                      options={fitnessLevelOptions}
                      menuPlacement="auto"
                    />
                  </div>
                  <div className="create-training__radio-wrapper">
                    <span className="create-training__label">
                      Кому подойдет тренировка
                    </span>
                    <br />
                    <div className="custom-toggle-radio create-training__radio">
                      {genderOptions.map(({ value, labelV2 }) => (
                        <RadioInput
                          key={labelV2}
                          label={labelV2}
                          name={FormFieldName.gender}
                          value={value}
                          onChange={handleInputChange}
                          checked={formData.gender === value}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-training__block">
                <h2 className="create-training__legend">Описание тренировки</h2>
                <Textarea
                  className="custom-textarea create-training__textarea"
                  name={FormFieldName.description}
                  value={formData?.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="create-training__block">
                <h2 className="create-training__legend">
                  Загрузите видео-тренировку
                </h2>
                <div className="drag-and-drop create-training__drag-and-drop">
                  <label>
                    <span className="drag-and-drop__label" tabIndex={0}>
                      Загрузите сюда файл формата MOV, AVI или MP4
                      <svg width="20" height="20" aria-hidden="true">
                        <use xlinkHref="#icon-import-video"></use>
                      </svg>
                    </span>
                    <input
                      type="file"
                      name={FormFieldName.video}
                      tabIndex={-1}
                      accept=".mov, .avi, .mp4"
                      onChange={handleInputFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <pre style={{ maxWidth: 800, overflow: 'scroll' }}>
              {JSON.stringify(formData)}
            </pre>
            <button
              className="btn create-training__button"
              type="submit"
              disabled={isLoadingCreateTraining}
            >
              Опубликовать
            </button>
            <Link
              className="btn btn--small btn--outlined sign-in__button"
              to={AppRoute.Profile}
            >
              Вернуться в профиль
            </Link>
          </div>
        </form>
      </div>
    </Popup>
  );
};
