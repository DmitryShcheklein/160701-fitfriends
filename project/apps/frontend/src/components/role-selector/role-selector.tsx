import React, { ChangeEventHandler } from 'react';

interface RoleOption {
  value: string;
  label: string;
  icon: string;
}

interface RoleSelectorProps {
  options: RoleOption[];
  name: string;
  legend: string;
  selectedValue: string;
  onChange: ChangeEventHandler;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  options,
  name,
  legend,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="sign-up__role">
      <h2 className="sign-up__legend">{legend}</h2>
      <div className="role-selector sign-up__role-selector">
        {options.map((option) => (
          <div className="role-btn" key={option.value}>
            <label>
              <input
                className="visually-hidden"
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
              />
              <span className="role-btn__icon">
                <svg width="12" height="13" aria-hidden="true">
                  <use xlinkHref={option.icon}></use>
                </svg>
              </span>
              <span className="role-btn__btn">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
