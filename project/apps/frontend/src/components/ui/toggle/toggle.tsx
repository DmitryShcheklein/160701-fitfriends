import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({ label, className, ...props }) => {
  const toggleClass = classNames(
    'custom-toggle',
    'custom-toggle--switch',
    className
  );

  return (
    <div className={toggleClass}>
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

export default Toggle;
