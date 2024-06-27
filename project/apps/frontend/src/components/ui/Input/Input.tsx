import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({
  label,
  type = 'text',
  className,
  readOnly,
  disabled,
  ...props
}: InputProps) => {
  return (
    <div
      className={classNames(
        'custom-input',
        { 'custom-textarea--readonly': readOnly },
        { 'custom-textarea--disabled': disabled },
        className
      )}
    >
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
          <input
            type={type}
            readOnly={readOnly}
            disabled={disabled}
            {...props}
          />
        </span>
      </label>
    </div>
  );
};

export default Input;
