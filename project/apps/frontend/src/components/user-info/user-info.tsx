import React, { ChangeEvent, useState } from 'react';
import { useGetUserQuery } from '../../store/user-process/user-api';
import CustomSelect from '../ui/Select/Select';
import Tag from '../ui/tag/tag';
import Input from '../ui/Input/Input';
import Textarea from '../ui/textarea/textarea';
import Toggle from '../ui/toggle/toggle';

const specializationOptions = [
  { value: 'Yoga', label: 'Йога' },
  { value: 'Running', label: 'Бег' },
  { value: 'Aerobics', label: 'Аэробика' },
  { value: 'Boxing', label: 'Бокс' },
  { value: 'Power', label: 'Силовые' },
  { value: 'Pilates', label: 'Пилатес' },
  { value: 'Stretching', label: 'Стрейчинг' },
  { value: 'CrossFit', label: 'Кроссфит' },
];

const locationOptions = [
  { value: 'Pionerskaya', label: 'Пионерская' },
  { value: 'Petrogradskaya', label: 'Петроградская' },
  { value: 'Udelnaya', label: 'Удельная' },
  { value: 'Zvezdnaya', label: 'Звёздная' },
  { value: 'Sportivnaya', label: 'Спортивная' },
];

const genderOptions = [
  { value: 'Female', label: 'Женский' },
  { value: 'Male', label: 'Мужской' },
  { value: 'Any', label: 'Неважно' },
];

const fitnessLevelOptions = [
  { value: 'Beginner', label: 'Новичок' },
  { value: 'Amateur', label: 'Любитель' },
  { value: 'Professional', label: 'Профессионал' },
];

const UserProfileInfo: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { data, isLoading } = useGetUserQuery();
  const {
    firstname,
    description,
    trainingConfig,
    location,
    gender,
    avatarPath,
  } = data || {};

  const { specialisation, level, trainingReadiness } = trainingConfig || {};
  const [specialization, setSpecialization] = useState(specialisation || []);

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, checked, readOnly } = evt.target;
    if (!readOnly) {
      setSpecialization((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }
  };

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    avatarPath || ''
  );
  const [formData, setFormData] = useState({
    avatarPath,
    firstname,
    description,
    trainingReadiness,
    location,
    gender,
  });
  const handleStatusChange = () => {
    setFormData((prev) => ({
      ...prev,
      trainingReadiness: !prev.trainingReadiness,
    }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            {avatarPreview ? (
              <div className="input-load-avatar__avatar">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  width="98px"
                  height="98px"
                />
              </div>
            ) : (
              <span className="input-load-avatar__btn">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-import"></use>
                </svg>
              </span>
            )}
          </label>
        </div>
      </div>
      <form className="user-info__form">
        <button
          className="btn-flat btn-flat--underlined user-info__edit-button"
          type="button"
          aria-label="Редактировать"
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>Редактировать</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <Input
            className="user-info__input"
            label="Имя"
            value={formData.firstname}
            readOnly={!isEditable}
          />

          <Textarea
            className="user-info__textarea"
            label="Описание"
            value={formData.description}
            readOnly={!isEditable}
          />
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <Toggle
            label="Готов тренироваться"
            className="user-info__toggle"
            checked={formData.trainingReadiness}
            onChange={handleStatusChange}
          />
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">
            Специализация
          </h2>
          <div className="specialization-checkbox user-info__specialization">
            {specializationOptions.map((option) => (
              <Tag
                key={option.value}
                name="specialization"
                value={option.value}
                label={option.label}
                checked={specialization.includes(option.value)}
                onChange={handleSpecializationChange}
                readOnly={true}
                size="small"
              />
            ))}
          </div>
        </div>
        <CustomSelect
          className="user-info__select"
          name="location"
          label="Локация"
          value={locationOptions.find((el) => el.value === formData.location)}
          options={locationOptions}
          isDisabled={!isEditable}
        />
        <CustomSelect
          className="user-info__select"
          name="gender"
          label="Пол"
          value={genderOptions.find((el) => el.value === formData.gender)}
          options={genderOptions}
          isDisabled={!isEditable}
        />
        <CustomSelect
          className="user-info__select"
          name="level"
          label="Уровень"
          value={fitnessLevelOptions.find((el) => el.value === level)}
          options={fitnessLevelOptions}
          isDisabled={!isEditable}
        />
      </form>
    </>
  );
};

export default UserProfileInfo;
