import SliderFilter from '../ui/slider-filter/slider-filter';

export const CatalogSidebar = () => {
  return (
    <div>
      <h1 className="visually-hidden">Мои тренировки</h1>
      <div className="my-training-form">
        <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
        <div className="">
          <button
            className="btn-flat btn-flat--underlined my-training-form__btnback"
            type="button"
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
            <span>Назад</span>
          </button>
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
                <li className="my-training-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="duration-1"
                        name="duration"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        10 мин - 30 мин
                      </span>
                    </label>
                  </div>
                </li>
                <li className="my-training-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="duration-2"
                        name="duration"
                        defaultChecked
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        30 мин - 50 мин
                      </span>
                    </label>
                  </div>
                </li>
                <li className="my-training-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="duration-3"
                        name="duration"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        50 мин - 80 мин
                      </span>
                    </label>
                  </div>
                </li>
                <li className="my-training-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="duration-4"
                        name="duration"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        80 мин - 100 мин
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
