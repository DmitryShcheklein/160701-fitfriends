import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, type = 'text', ...props }: InputProps) => {
  return (
    <div className="custom-input">
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
          <input type={type} {...props} />
        </span>
      </label>
    </div>
  );
};

export default Input;
