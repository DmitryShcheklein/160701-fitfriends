import React from 'react';

interface TagProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  size?: 'small' | 'big';
}

const Tag: React.FC<TagProps> = ({
  name,
  value,
  label,
  checked,
  onChange,
  size = 'small',
}) => {
  return (
    <div className={`btn-checkbox btn-checkbox--${size}`}>
      <label>
        <input
          className="visually-hidden"
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className="btn-checkbox__btn">{label}</span>
      </label>
    </div>
  );
};

export default Tag;
