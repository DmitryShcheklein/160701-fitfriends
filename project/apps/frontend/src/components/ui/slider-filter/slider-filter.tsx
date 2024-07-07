import React, { useState, useEffect } from 'react';
import Nouislider, { NouisliderProps } from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import './slider-filter.css';
import classNames from 'classnames';

interface FilterProps extends Omit<NouisliderProps, 'start' | 'onChange'> {
  label: string;
  start: string[] | number[];
  onChange?: (values: [number, number]) => void;
  withInputs?: boolean;
  range: { min: number; max: number };
}

const InputFieldName = {
  Min: 'min',
  Max: 'max',
} as const;

const SliderFilter = ({
  className,
  withInputs = true,
  range,
  start,
  label,
  step = 1,
  tooltips = false,
  onChange,
}: FilterProps) => {
  const startValues = start.map(String);
  const [inputValues, setInputValues] = useState(startValues);
  const [inputMin, inputMax] = inputValues;
  const [sliderValues, setSliderValues] = useState(startValues);

  useEffect(() => {
    onChange?.([Number(inputMin), Number(inputMax)]);
  }, [inputMin, inputMax, onChange]);

  const handleSliderUpdate = (values: string[]) => {
    const [min, max] = values;
    setInputValues([min, max]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === InputFieldName.Min) {
      const values = [value, inputMax];
      setInputValues(values);
      setSliderValues(values);
    }
    if (name === InputFieldName.Max) {
      const values = [inputMin, value];
      setInputValues(values);
      setSliderValues(values);
    }
  };
  const [inputMinId, inputMaxId] = Object.values(InputFieldName).map(
    (fieldName) => `${label}-${fieldName}`
  );

  return (
    <div className={classNames(className)}>
      <h4 className="my-training-form__block-title">{label}</h4>

      {withInputs && (
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id={inputMinId}
              name={InputFieldName.Min}
              value={inputMin}
              onChange={handleInputChange}
            />
            <label htmlFor={inputMinId}>от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id={inputMaxId}
              name={InputFieldName.Max}
              value={inputMax}
              onChange={handleInputChange}
            />
            <label htmlFor={inputMaxId}>до</label>
          </div>
        </div>
      )}

      <Nouislider
        className={classNames({
          'noUi-tooltips': tooltips,
        })}
        range={{ min: range.min, max: range.max }}
        start={sliderValues}
        step={step}
        onSlide={handleSliderUpdate}
        format={{
          from: (value) => Number(value),
          to: (value) => Number(value),
        }}
        tooltips={tooltips}
        connect
      />
    </div>
  );
};

export default SliderFilter;
