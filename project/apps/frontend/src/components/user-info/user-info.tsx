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
import { useAppDispatch } from '../../hooks';
import {
  specializationOptions,
  locationOptions,
  genderOptions,
  fitnessLevelOptions,
} from './user-info.data';
import { UserLocation } from '../../enums';

enum UserFormFieldName {
  FirstName = 'firstname',
  Description = 'description',
  Gender = 'gender',
  Location = 'location',
  Role = 'role',
  AvatarPath = 'avatar',
}
enum TrainingConfigFieldName {
  Level = 'level',
  Specialisation = 'specialisation',
}
const UserProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const [updateUser, { isLoading: isLoadingUserMutation }] =
    useUpdateUserMutation();
  const [isEditable, setIsEditable] = useState(false);
  const { data: userData, isLoading } = useGetUserQuery();
  const [trainingConfigData, setTrainingConfigData] = useState({
    [TrainingConfigFieldName.Level]: userData?.trainingConfig?.level,
    [TrainingConfigFieldName.Specialisation]:
      userData?.trainingConfig?.specialisation,
  });

  const [formUserData, setFormUserData] = useState({
    [UserFormFieldName.FirstName]: userData?.firstname,
    [UserFormFieldName.Description]: userData?.description,
    [UserFormFieldName.Location]: userData?.location,
    [UserFormFieldName.Gender]: userData?.gender,
    [UserFormFieldName.AvatarPath]: userData?.avatarPath,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    formUserData?.avatar || ''
  );

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
        avatar: avatarPath,
        location,
        gender,
      });
      setTrainingConfigData(trainingConfig);
      setAvatarPreview(avatarPath);
    }
  }, [userData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value, type, checked } = e.target;
  //   if (type === 'checkbox') {
  //     setFormUserData((prev) => ({
  //       ...prev,
  //       [name]: checked,
  //     }));
  //   } else {
  //     setFormUserData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked, readOnly } = evt.target;
  //   if (!readOnly) {
  //     setSpecialization((prev) =>
  //       checked ? [...prev, value] : prev.filter((item) => item !== value)
  //     );
  //   }
  // };

  const handleEditBtn = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveBtn = async () => {
    setIsEditable(!isEditable);

    try {
      if (formUserData) {
        console.log(formUserData);
        const userData = await updateUser(formUserData).unwrap();
        // dispatch(setCredentials(userData));
      }
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
            {avatarPreview ? (
              <div className="input-load-avatar__avatar">
                <img src={avatarPreview} alt="Avatar Preview" />
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
            name="firstname"
          />

          <Textarea
            className="user-info__textarea"
            label="Описание"
            name="description"
            value={formUserData?.description}
            readOnly={!isEditable}
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
                // onChange={handleSpecializationChange}
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
          name="gender"
          label="Пол"
          value={genderOptions.find((el) => el.value === formUserData?.gender)}
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
