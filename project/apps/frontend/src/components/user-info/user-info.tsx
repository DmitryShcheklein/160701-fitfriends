import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  useUserQuery,
  useUpdateTrainingConfigMutation,
  useUpdateUserMutation,
} from '../../store/user-process/user-api';
import CustomSelect from '../ui/Select/Select';
import Tag from '../ui/tag/tag';
import Input from '../ui/Input/Input';
import Textarea from '../ui/textarea/textarea';
import Toggle from '../ui/toggle/toggle';
import {
  specializationOptions,
  locationOptions,
  genderOptions,
  fitnessLevelOptions,
} from './user-info.data';
import { UserLocation, UserGender, WorkoutType } from '@project/enums';
import { UpdateUserDto } from '@project/dto';
import { UserRdo } from '@project/rdo';
import { toast } from 'react-toastify';
import classNames from 'classnames';

export const UserFormFieldName = {
  FirstName: 'firstname',
  Description: 'description',
  Gender: 'gender',
  Location: 'location',
  Role: 'role',
  Avatar: 'avatar',
  AvatarPath: 'avatarPath',
} as const;

export type UserFormFieldName =
  (typeof UserFormFieldName)[keyof typeof UserFormFieldName];

type TFormUserDataState = {
  [UserFormFieldName.FirstName]: UpdateUserDto['firstname'];
  [UserFormFieldName.Description]: UpdateUserDto['description'];
  [UserFormFieldName.Location]: UpdateUserDto['location'];
  [UserFormFieldName.Gender]: UpdateUserDto['gender'];
  [UserFormFieldName.AvatarPath]?: string | null;
  [UserFormFieldName.Avatar]?: Blob | null;
};

export const TrainingConfigFieldName = {
  Level: 'level',
  Specialisation: 'specialisation',
  TrainingReadiness: 'trainingReadiness',
} as const;

export type TrainingConfigFieldName =
  (typeof TrainingConfigFieldName)[keyof typeof TrainingConfigFieldName];
type TConfigState = Record<TrainingConfigFieldName, any>;

const UserProfileInfo: React.FC = () => {
  const [updateUser, { isLoading: isLoadingUserMutation }] =
    useUpdateUserMutation();

  const [updateConfig, { isLoading: isLoadingConfigMutation }] =
    useUpdateTrainingConfigMutation();

  const [isEditable, setIsEditable] = useState(false);
  const { data: userData, isLoading } = useUserQuery();
  const [trainingConfigData, setTrainingConfigData] = useState<TConfigState>({
    level: userData?.trainingConfig?.level,
    specialisation: userData?.trainingConfig?.specialisation,
    trainingReadiness: userData?.trainingConfig?.trainingReadiness,
  });

  const [formUserData, setFormUserData] = useState<TFormUserDataState>({
    [UserFormFieldName.FirstName]: userData?.firstname || '',
    [UserFormFieldName.Description]: userData?.description,
    [UserFormFieldName.Location]: userData?.location,
    [UserFormFieldName.Gender]: userData?.gender,
    [UserFormFieldName.AvatarPath]: userData?.avatarPath,
    [UserFormFieldName.Avatar]: undefined,
  });
  const [avatarPreview, setAvatarPreview] = useState<UserRdo['avatarPath']>('');

  useEffect(() => {
    if (userData) {
      const {
        firstname,
        description,
        avatarPath,
        location,
        gender,
        trainingConfig,
      } = userData;
      setFormUserData({
        firstname,
        description,
        avatarPath,
        location,
        gender,
      });

      setTrainingConfigData({
        level: trainingConfig?.level,
        specialisation: trainingConfig?.specialisation,
        trainingReadiness: trainingConfig?.trainingReadiness,
      });
    }
  }, [userData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      const [file] = Array.from(files);
      setFormUserData({ ...formUserData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, checked, readOnly } = evt.target;
    if (!readOnly) {
      setTrainingConfigData((prev) => {
        const currentSpecialisation = prev.specialisation;

        return {
          ...prev,
          specialisation: checked
            ? currentSpecialisation?.concat([value] as WorkoutType[])
            : currentSpecialisation?.filter((item) => item !== value),
        };
      });
    }
  };

  const handleEditBtn = () => {
    setIsEditable(!isEditable);
  };
  const handleResetBtnAvatar = () => {
    setAvatarPreview('');
    setFormUserData((prev) => ({
      ...prev,
      [UserFormFieldName.Avatar]: null,
      [UserFormFieldName.AvatarPath]: null,
    }));
  };
  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();
    const userForm = new FormData();

    Object.entries(Object.assign(formUserData)).forEach(([key, value]) => {
      if (value) {
        userForm.append(key, value);
      }
      if (!value && key === UserFormFieldName.Avatar) {
        userForm.append(key, value);
      }
    });

    try {
      await updateUser(userForm).unwrap();
      await updateConfig(trainingConfigData).unwrap();
      setIsEditable(!isEditable);
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
    <form onSubmit={handleSubmitForm}>
      <div className="user-info__header">
        <div className="input-load-avatar">
          <input
            id="avatar"
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            disabled={!isEditable}
          />
          {avatarPreview || formUserData.avatarPath ? (
            <div className="input-load-avatar__avatar">
              <img
                src={avatarPreview || formUserData.avatarPath || undefined}
                alt="Avatar Preview"
              />
            </div>
          ) : (
            <span className="input-load-avatar__btn">
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-import"></use>
              </svg>
            </span>
          )}
        </div>
        {isEditable ? (
          <div className="user-info-edit__controls">
            <label
              className="user-info-edit__control-btn"
              title="Обновить аватар"
              aria-label="Обновить аватар"
              htmlFor="avatar"
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change" />
              </svg>
            </label>
            <button
              className="user-info-edit__control-btn"
              title="Удалить аватар"
              aria-label="Удалить аватар"
              onClick={handleResetBtnAvatar}
              type="button"
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
      <div className="user-info__form">
        <button
          onClick={handleEditBtn}
          className={classNames(
            'btn-flat btn-flat--underlined user-info__button',
            {
              'user-info__button--visible': !isEditable,
            }
          )}
          type="button"
          aria-label="Редактировать"
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>Редактировать</span>
        </button>

        <button
          className={classNames(
            'btn-flat btn-flat--underlined user-info__button',
            {
              'user-info__button--visible': isEditable,
            }
          )}
          type="submit"
          aria-label="Сохранить"
          disabled={isLoadingUserMutation || isLoadingConfigMutation}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>Сохранить</span>
        </button>

        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <Input
            className="user-info__input"
            label="Имя"
            value={formUserData.firstname}
            readOnly={!isEditable}
            name={UserFormFieldName.FirstName}
            onChange={handleInputChange}
          />

          <Textarea
            className="user-info__textarea"
            label="Описание"
            name={UserFormFieldName.Description}
            value={formUserData?.description}
            readOnly={!isEditable}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <Toggle
            label="Готов тренироваться"
            className="user-info__toggle"
            checked={Boolean(trainingConfigData?.trainingReadiness)}
            disabled
            onChange={(evt) => {
              setTrainingConfigData({
                ...trainingConfigData,
                trainingReadiness: evt.target.checked,
              });
            }}
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
                checked={Boolean(
                  trainingConfigData.specialisation?.includes(option.value)
                )}
                onChange={handleSpecializationChange}
                readOnly={!isEditable}
                size="small"
              />
            ))}
          </div>
        </div>
        <CustomSelect
          className="user-info__select"
          name={UserFormFieldName.Location}
          label="Локация"
          value={locationOptions.find(
            (el) => el.value === formUserData?.location
          )}
          options={locationOptions}
          onChange={(newValue: { name: string; value: UserLocation }) => {
            setFormUserData({
              ...formUserData,
              location: newValue.value,
            });
          }}
          isDisabled={!isEditable}
        />
        <CustomSelect
          className="user-info__select"
          name={UserFormFieldName.Gender}
          label="Пол"
          value={genderOptions.find((el) => el.value === formUserData?.gender)}
          onChange={(newValue: { name: string; value: UserGender }) => {
            setFormUserData({
              ...formUserData,
              gender: newValue.value,
            });
          }}
          options={genderOptions}
          isDisabled={!isEditable}
        />
        <CustomSelect
          className="user-info__select"
          name="level"
          label="Уровень"
          value={fitnessLevelOptions.find(
            (el) => el.value === trainingConfigData?.level
          )}
          options={fitnessLevelOptions}
          isDisabled
        />
      </div>
    </form>
  );
};

export default UserProfileInfo;
