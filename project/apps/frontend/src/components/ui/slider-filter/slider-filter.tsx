import React, { useState, useEffect } from 'react';
import Nouislider, { NouisliderProps } from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import './slider-filter.css';

interface FilterProps extends Omit<NouisliderProps, 'start' | 'onChange'> {
  label: string;
  start: string[] | number[];
  onChange?: (values: [string, string]) => void;
  withInputs?: boolean;
  range: { min: number; max: number };
}

const InputFieldName = {
  Min: 'min',
  Max: 'max',
} as const;

const Filter: React.FC<FilterProps> = ({
  className = '',
  withInputs = true,
  range,
  start,
  label,
  onChange,
}) => {
  const startValues = start.map(String);
  const [inputValues, setInputValues] = useState<string[]>(startValues);
  const [inputMin, inputMax] = inputValues;
  const [sliderValues, setSliderValues] = useState<string[]>(startValues);

  useEffect(() => {
    onChange?.([inputMin, inputMax]);
  }, [inputMin, inputMax, onChange]);

  const handleSliderUpdate = (values: string[]) => {
    const [min, max] = values;
    setInputValues([min, max]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const [sliderMin, sliderMax] = sliderValues;

    if (name === InputFieldName.Min) {
      setInputValues([value, inputMax]);
      setSliderValues([value, sliderMax]);
    }
    if (name === InputFieldName.Max) {
      setInputValues([inputMin, value]);
      setSliderValues([sliderMin, value]);
    }
  };
  const [inputMinId, inputMaxId] = Object.values(InputFieldName).map(
    (fieldName) => `${label}${fieldName}`
  );

  return (
    <div className={`filter ${className}`}>
      <h4 className="my-training-form__block-title">{label}</h4>

      <div className="filter-price">
        {withInputs && (
          <>
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
          </>
        )}
      </div>

      <Nouislider
        className="filter__slider"
        padding={1}
        range={{ min: range.min, max: range.max }}
        start={sliderValues}
        step={1}
        onSlide={handleSliderUpdate}
        format={{
          from: (value) => Number(value),
          to: (value) => Number(value),
        }}
        connect
      />
    </div>
  );
};

export default Filter;
