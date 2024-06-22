import React, { InputHTMLAttributes } from 'react';

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioInput = ({ label, name, value, ...props }: RadioInputProps) => {
  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input type="radio" name={name} value={value} {...props} />
        <span className="custom-toggle-radio__icon"></span>
        <span className="custom-toggle-radio__label">{label}</span>
      </label>
    </div>
  );
};

export default RadioInput;
