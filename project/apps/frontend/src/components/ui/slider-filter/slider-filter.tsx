import React, { useState, useEffect } from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import './slider-filter.css';

interface FilterProps {
  label: string;
  className?: string;
  withInputs?: boolean;
  range: { min: number; max: number };
  startValues: [number, number];
  onChange?: (values: [string, string]) => void;
}

const InputFieldName = {
  Min: 'min',
  Max: 'max',
} as const;

const Filter: React.FC<FilterProps> = ({
  className = '',
  withInputs = true,
  range,
  startValues,
  onChange,
  label,
}) => {
  const values = startValues.map(String);
  const [inputValues, setInputValues] = useState<string[]>(values);
  const [inputMin, inputMax] = inputValues;
  const [sliderValues, setSliderValues] = useState<string[]>(values);

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
        range={{ min: range.min, max: range.max }}
        start={sliderValues}
        connect
        step={1}
        onSlide={handleSliderUpdate}
        className="filter__slider"
        padding={4}
      />
    </div>
  );
};

export default Filter;
