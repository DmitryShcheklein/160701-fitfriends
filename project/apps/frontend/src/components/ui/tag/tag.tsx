import React, { InputHTMLAttributes } from 'react';

interface TagProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: 'small' | 'big';
}

const Tag: React.FC<TagProps> = ({ label, size = 'small', ...props }) => {
  return (
    <label className={`btn-checkbox btn-checkbox--${size}`}>
      <input className="visually-hidden" type="checkbox" {...props} />
      <span className="btn-checkbox__btn">{label}</span>
    </label>
  );
};

export default Tag;
