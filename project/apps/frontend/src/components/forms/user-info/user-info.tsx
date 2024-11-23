import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  useGetCurrentUserQuery,
  useUpdateTrainingConfigMutation,
  useUpdateUserMutation,
} from '../../../store/user-process/user-api';
import CustomSelect from '../../ui/select/select';
import Tag from '../../ui/tag/tag';
import Input from '../../ui/input/input';
import Textarea from '../../ui/textarea/textarea';
import Toggle from '../../ui/toggle/toggle';
import {
  specializationOptions,
  locationOptions,
  genderOptions,
  fitnessLevelOptions,
} from '../../../shared/data';
import {
  UserLocation,
  UserGender,
  WorkoutType,
  FitnessLevel,
} from '@project/enums';
import { UpdateUserDto } from '@project/dto';
import { UserRdo } from '@project/rdo';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useAuthRole } from '../../../hooks/useAuth';

export const UserFormFieldName = {
  firstName: 'firstName',
  Description: 'description',
  Gender: 'gender',
  Location: 'location',
  Avatar: 'avatar',
  AvatarPath: 'avatarPath',
} as const;

type TFormUserDataState = {
  [UserFormFieldName.firstName]: UpdateUserDto['firstName'];
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
  const [isEditable, setIsEditable] = useState(false);
  const { isUserAuth } = useAuthRole();
  const [updateUser, { isLoading: isLoadingUserMutation }] =
    useUpdateUserMutation();

  const [updateConfig, { isLoading: isLoadingConfigMutation }] =
    useUpdateTrainingConfigMutation();

  const { data: userData, isLoading } = useGetCurrentUserQuery();
  const [trainingConfigData, setTrainingConfigData] = useState<TConfigState>({
    level: userData?.trainingConfig?.level,
    specialisation: userData?.trainingConfig?.specialisation,
    trainingReadiness: userData?.trainingConfig?.trainingReadiness,
  });

  const [formUserData, setFormUserData] = useState<TFormUserDataState>({
    [UserFormFieldName.firstName]: userData?.firstName || '',
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
        firstName,
        description,
        avatarPath,
        location,
        gender,
        trainingConfig,
      } = userData;
      setFormUserData({
        firstName,
        description,
        avatarPath,
        location,
        gender,
      });

      setTrainingConfigData({
        level: trainingConfig?.level,
        specialisation: trainingConfig?.specialisation || [],
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

  const handleSpecializationChange = async (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked, readOnly } = evt.target;

    if (!readOnly) {
      const currentSpecialisation = [...trainingConfigData.specialisation];
      const newData = checked
        ? currentSpecialisation?.concat([value] as WorkoutType[])
        : currentSpecialisation?.filter((item) => item !== value);

      try {
        await updateConfig({
          specialisation: newData,
        }).unwrap();

        setTrainingConfigData({
          ...trainingConfigData,
          specialisation: newData,
        });
      } catch (err: any) {
        toast.error(err.data.message.join(''));
      }
    }
  };
  const handleTrainingReadinessChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (evt) => {
    const value = evt.target.checked;

    try {
      await updateConfig({ trainingReadiness: value }).unwrap();

      setTrainingConfigData({
        ...trainingConfigData,
        trainingReadiness: value,
      });
    } catch (err: any) {
      toast.error(err.data.message.join(''));
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
      console.error('Failed to submit: ', err);
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
            value={formUserData.firstName}
            readOnly={!isEditable}
            name={UserFormFieldName.firstName}
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
            label={isUserAuth ? 'Готов тренироваться' : 'Готов тренировать'}
            className="user-info__toggle"
            checked={Boolean(trainingConfigData?.trainingReadiness)}
            onChange={handleTrainingReadinessChange}
            disabled={isLoadingConfigMutation}
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
          onChange={(newValue: { name: string; value: FitnessLevel }) => {
            setTrainingConfigData({
              ...trainingConfigData,
              level: newValue.value,
            });
          }}
          options={fitnessLevelOptions}
          isDisabled={!isEditable}
          menuPlacement="auto"
        />
      </div>
    </form>
  );
};

export default UserProfileInfo;
