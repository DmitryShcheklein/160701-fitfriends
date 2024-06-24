import React, { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  readOnly,
  disabled,
  className,
  ...props
}) => {
  const textareaClass = classNames(
    'custom-textarea',
    { 'custom-textarea--readonly': readOnly },
    { 'custom-textarea--disabled': disabled },
    className
  );

  return (
    <div className={textareaClass}>
      <label>
        <span className="custom-textarea__label">{label}</span>
        <textarea {...props}>{value}</textarea>
      </label>
    </div>
  );
};

export default Textarea;
