import React, { InputHTMLAttributes } from 'react';

interface TagProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: 'small' | 'big';
}

const Tag: React.FC<TagProps> = ({ label, size = 'small', ...props }) => {
  return (
    <div className={`btn-checkbox btn-checkbox--${size}`}>
      <label>
        <input className="visually-hidden" type="checkbox" {...props} />
        <span className="btn-checkbox__btn">{label}</span>
      </label>
    </div>
  );
};

export default Tag;
