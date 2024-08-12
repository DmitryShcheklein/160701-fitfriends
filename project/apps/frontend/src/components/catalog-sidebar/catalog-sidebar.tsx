import { Link } from 'react-router-dom';
import SliderFilter from '../ui/slider-filter/slider-filter';
import { AppRoute } from '../../shared/const';
import CheckboxInput from '../ui/checkbox-input/checkbox-input';
import { TrainingsWithPaginationRdo } from '@project/rdo';
import { specializationOptions } from '../forms/user-info/user-info.data';
import { useState } from 'react';
import { TrainingsQuery } from '@project/core';
import { SortBy, WorkoutType } from '@project/enums';

interface CatalogSidebarProps {
  filters?: TrainingsWithPaginationRdo['filters'];
  setFilter: React.Dispatch<React.SetStateAction<TrainingsQuery>>;
}

export const CatalogSidebar = ({ filters, setFilter }: CatalogSidebarProps) => {
  const [selectedSort, setSelectedSort] = useState('');
  if (!filters) return null;

  const { price } = filters;
  const { min: minPrice, max: maxPrice } = price;

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value);
  };

  return (
    <div>
      <h1 className="visually-hidden">Каталог тренировок — FitFriends</h1>
      <div className="my-training-form">
        <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
        <Link
          to={AppRoute.Index}
          className="btn-flat btn-flat--underlined my-training-form__btnback"
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left" />
          </svg>
          <span>Назад</span>
        </Link>
        <div>
          <h3 className="my-training-form__title">фильтры</h3>
          <form className="my-training-form__form">
            <SliderFilter
              label="Цена, ₽"
              start={[minPrice, maxPrice]}
              range={{ min: minPrice, max: maxPrice }}
              className="my-training-form__block--price"
              onChange={(values) => {
                // console.log(values);
              }}
            />
            <SliderFilter
              label="Калории"
              start={[0, 100]}
              range={{ min: 0, max: 100 }}
              className="my-training-form__block--price"
              onChange={(values) => {
                // console.log(values);
              }}
              hidden
            />
            <SliderFilter
              label="Рейтинг"
              className="my-training-form__block--raiting"
              start={[0, 5]}
              range={{ min: 0, max: 5 }}
              withInputs={false}
              tooltips
              onChange={(values) => {
                // console.log(values);
              }}
              hidden
            />

            <div className="gym-catalog-form__block gym-catalog-form__block--type">
              <h4 className="gym-catalog-form__block-title">Тип</h4>
              <ul className="gym-catalog-form__check-list">
                {specializationOptions.map(({ label, value }) => (
                  <CheckboxInput
                    className="gym-catalog-form__check-list-item"
                    label={label}
                    value={value}
                    onChange={(evt) => {
                      const input = evt.target;
                      const isChecked = evt.target.checked;

                      const value = input.value as WorkoutType;

                      setFilter((prev) => {
                        const newTrainings = isChecked
                          ? [...(prev.trainingType || []), value]
                          : prev.trainingType?.filter((elem) => elem !== value);
                        if (!newTrainings?.length) {
                          const { trainingType, ...rest } = prev;
                          return rest;
                        }
                        return {
                          ...prev,
                          trainingType: newTrainings,
                        };
                      });
                    }}
                  />
                ))}
              </ul>
            </div>

            <div className="gym-catalog-form__block gym-catalog-form__block--sort">
              <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
                Сортировка
              </h4>
              <div className="btn-radio-sort gym-catalog-form__radio">
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value={SortBy.price}
                    checked={selectedSort === 'cheap'}
                    onChange={handleSortChange}
                  />
                  <span className="btn-radio-sort__label">Дешевле</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value="expensive"
                    checked={selectedSort === 'expensive'}
                    onChange={handleSortChange}
                  />
                  <span className="btn-radio-sort__label">Дороже</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value="free"
                    checked={selectedSort === 'free'}
                    onChange={handleSortChange}
                    disabled
                  />
                  <span className="btn-radio-sort__label">Бесплатные</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
