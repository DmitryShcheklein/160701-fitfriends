import { Link } from 'react-router-dom';
import SliderFilter from '../ui/slider-filter/slider-filter';
import { AppRoute } from '../../shared/const';
import CheckboxInput from '../ui/checkbox-input/checkbox-input';

export const CatalogSidebar = () => {
  return (
    <div>
      <h1 className="visually-hidden">Мои тренировки</h1>
      <div className="my-training-form">
        <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
        <div className="">
          <Link
            to={AppRoute.Index}
            className="btn-flat btn-flat--underlined my-training-form__btnback"
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </Link>
          <h3 className="my-training-form__title">фильтры</h3>
          <form className="my-training-form__form">
            <SliderFilter
              label="Цена, ₽"
              start={[0, 100]}
              range={{ min: 0, max: 100 }}
              className="my-training-form__block--price"
              onChange={(values) => {
                console.log(values);
              }}
            />
            <SliderFilter
              label="Калории"
              start={[0, 100]}
              range={{ min: 0, max: 100 }}
              className="my-training-form__block--price"
              onChange={(values) => {
                console.log(values);
              }}
            />
            <SliderFilter
              label="Рейтинг"
              className="my-training-form__block--raiting"
              start={[0, 5]}
              range={{ min: 0, max: 5 }}
              withInputs={false}
              tooltips
              onChange={(values) => {
                console.log(values);
              }}
            />

            <div className="my-training-form__block my-training-form__block--duration">
              <h4 className="my-training-form__block-title">Длительность</h4>
              <ul className="my-training-form__check-list">
                <CheckboxInput
                  className="my-training-form__check-list-item"
                  label="10 мин - 30 мин"
                />
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
