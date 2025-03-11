import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  useGetTrainingConfigQuery,
  useUpdateTrainingConfigMutation,
} from '../../../../../store/user-process/user-api';
import { toast } from 'react-toastify';

const FieldName = {
  CaloriesPerDay: 'caloriesPerDay',
} as const;
type FieldName = (typeof FieldName)[keyof typeof FieldName];
type TState = Record<FieldName, number>;

export const Schedule = () => {
  const [updateConfig] = useUpdateTrainingConfigMutation();
  const { data: trainingConfig } = useGetTrainingConfigQuery();

  const [configData, setConfigData] = useState<TState>({
    caloriesPerDay: Number(trainingConfig?.caloriesPerDay),
  });

  useEffect(() => {
    if (trainingConfig) {
      setConfigData(trainingConfig);
    }
  }, [trainingConfig]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const typeNumber = type === 'number';

    setConfigData((prev) => ({
      ...prev,
      [name]: typeNumber ? Number(value) : value,
    }));
  };

  const handleSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await updateConfig(configData).unwrap();

      toast.success('Данные успешно сохранены!');
    } catch (err: any) {
      console.error('Failed to register: ', err);
      toast.error(err.data.message.join(''));
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      (evt.target as HTMLInputElement).form?.requestSubmit();
    }
  };

  return (
    <div className="personal-account-user__schedule">
      <form onSubmit={handleSubmitForm}>
        <div className="personal-account-user__form">
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">
                План на день, ккал
              </span>
              <input
                type="number"
                name={FieldName.CaloriesPerDay}
                value={configData.caloriesPerDay || ''}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </label>
          </div>
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">
                План на неделю, ккал
              </span>
              <input
                type="text"
                value={configData.caloriesPerDay * 7 || ''}
                disabled
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
