import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames('custom-toggle custom-toggle--checkbox', className)}
    >
      <label>
        <input type="checkbox" {...props} />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check" />
          </svg>
        </span>
        <span className="custom-toggle__label">{label}</span>
      </label>
    </div>
  );
};

export default CheckboxInput;
