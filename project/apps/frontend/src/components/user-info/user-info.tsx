import React, { ChangeEvent, FormEvent, useState } from 'react';

import CustomSelect from '../ui/Select/Select';
import Tag from '../ui/tag/tag';
import Input from '../ui/Input/Input';
import Textarea from '../ui/textarea/textarea';
import Toggle from '../ui/toggle/toggle';

const specializationOptions = [
  { value: 'yoga', label: 'Йога' },
  { value: 'running', label: 'Бег' },
  { value: 'aerobics', label: 'Аэробика' },
  { value: 'boxing', label: 'Бокс' },
  { value: 'power', label: 'Силовые' },
  { value: 'pilates', label: 'Пилатес' },
  { value: 'stretching', label: 'Стрейчинг' },
  { value: 'crossfit', label: 'Кроссфит' },
];

const UserProfileInfo: React.FC = () => {
  const [specialization, setSpecialization] = useState<string[]>([
    'yoga',
    'aerobics',
    'pilates',
    'stretching',
  ]);
  const [isReadyForTraining, setIsReadyForTraining] = useState(true);

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = evt.target;
    setSpecialization((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleStatusChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsReadyForTraining(evt.target.checked);
  };
  const [avatarPreview, setAvatarPreview] = useState<string>(
    'img/content/user-photo-1.png'
  );
  const [formData, setFormData] = useState({
    name: 'Валерия',
    description:
      'Персональный тренер и инструктор групповых программ с опытом более 4х лет. Специализация: коррекция фигуры и осанки, снижение веса, восстановление после травм, пилатес.',
    readyForTraining: true,
    specialization: {
      yoga: true,
      running: false,
      aerobics: true,
      boxing: false,
      power: false,
      pilates: true,
      stretching: true,
      crossfit: false,
    },
    location: 'ст. м. Адмиралтейская',
    gender: 'Женский',
    level: 'Профессионал',
  });

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
            />
            <span className="input-load-avatar__avatar">
              <img src={avatarPreview} width="98" height="98" alt="user" />
            </span>
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
          <Input className="user-info__input" label="Имя" />

          <Textarea className="user-info__textarea" label="Описание" readOnly />
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <Toggle
            label="Готов тренироваться"
            className="user-info__toggle"
            checked={isReadyForTraining}
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
                size="small"
              />
            ))}
          </div>
        </div>
        <CustomSelect
          name="location"
          label="Локация"
          value="ст. м. Адмиралтейская"
          options={[]}
          isDisabled={true}
        />
        <CustomSelect
          name="gender"
          label="Пол"
          value="Женский"
          options={[]}
          isDisabled={true}
        />
        <CustomSelect
          name="level"
          label="Уровень"
          value="Профессионал"
          options={[]}
          isDisabled={true}
        />
      </form>
    </>
  );
};

export default UserProfileInfo;
