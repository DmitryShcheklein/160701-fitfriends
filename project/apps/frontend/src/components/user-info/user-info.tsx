import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  useGetUserQuery,
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

enum UserFormFieldName {
  FirstName = 'firstname',
  Description = 'description',
  Gender = 'gender',
  Location = 'location',
  Role = 'role',
  Avatar = 'avatar',
  AvatarPath = 'avatarPath',
}

enum TrainingConfigFieldName {
  Level = 'level',
  Specialisation = 'specialisation',
  TrainingReadiness = 'trainingReadiness',
}

type FormUserDataState = {
  [UserFormFieldName.FirstName]: UpdateUserDto['firstname'];
  [UserFormFieldName.Description]: UpdateUserDto['description'];
  [UserFormFieldName.Location]: UpdateUserDto['location'];
  [UserFormFieldName.Gender]: UpdateUserDto['gender'];
  [UserFormFieldName.AvatarPath]?: string | null;
  [UserFormFieldName.Avatar]?: UpdateUserDto['avatar'];
};

const UserProfileInfo: React.FC = () => {
  const [updateUser, { isLoading: isLoadingUserMutation }] =
    useUpdateUserMutation();
  const [isEditable, setIsEditable] = useState(false);
  const { data: userData, isLoading } = useGetUserQuery();
  const [trainingConfigData, setTrainingConfigData] = useState({
    [TrainingConfigFieldName.Level]: userData?.trainingConfig?.level,
    [TrainingConfigFieldName.Specialisation]:
      userData?.trainingConfig?.specialisation,
    [TrainingConfigFieldName.TrainingReadiness]:
      userData?.trainingConfig?.trainingReadiness,
  });

  const [formUserData, setFormUserData] = useState<FormUserDataState>({
    [UserFormFieldName.FirstName]: userData?.firstname,
    [UserFormFieldName.Description]: userData?.description,
    [UserFormFieldName.Location]: userData?.location,
    [UserFormFieldName.Gender]: userData?.gender,
    [UserFormFieldName.AvatarPath]: userData?.avatarPath,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>('');

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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    if (!readOnly && trainingConfigData?.specialisation?.length) {
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

  const handleSaveBtn = async () => {
    setIsEditable(!isEditable);

    const sendData: UpdateUserDto = {
      ...formUserData,
      avatar:
        typeof formUserData.avatar === 'string'
          ? undefined
          : formUserData.avatar,
    };
    try {
      await updateUser(sendData).unwrap();
    } catch (err) {
      console.error('Failed to register: ', err);
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
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
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
          </label>
        </div>
      </div>
      <div className="user-info__form">
        {!isEditable ? (
          <button
            onClick={handleEditBtn}
            className="btn-flat btn-flat--underlined user-info__edit-button"
            type="button"
            aria-label="Редактировать"
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Редактировать</span>
          </button>
        ) : (
          <button
            onClick={handleSaveBtn}
            className="btn-flat btn-flat--underlined user-info__edit-button"
            type="submit"
            aria-label="Сохранить"
            disabled={isLoadingUserMutation}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
        )}

        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <Input
            className="user-info__input"
            label="Имя"
            value={formUserData?.firstname}
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
            checked={trainingConfigData?.trainingReadiness}
            disabled
            onChange={(evt) => {
              setTrainingConfigData({
                ...trainingConfigData,
                trainingReadiness: evt.target.checked,
              });
            }}
            // onChange={handleStatusChange}
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
                checked={trainingConfigData?.specialisation?.includes(
                  option.value
                )}
                onChange={handleSpecializationChange}
                readOnly={true}
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
    </>
  );
};

export default UserProfileInfo;
