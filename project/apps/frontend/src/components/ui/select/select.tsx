import Select, { components, Props } from 'react-select';
import classNames from 'classnames';
import { customStyles } from './styles';

interface CustomSelectProps extends Props {
  label?: string;
}
const CustomSelect = (props: CustomSelectProps) => {
  const { label, className } = props;

  return (
    <div className={classNames('custom-select', className)}>
      <span className="custom-select__label">{label}</span>
      <Select
        {...props}
        components={{ DropdownIndicator }}
        styles={customStyles}
        classNamePrefix="custom-select"
      />
    </div>
  );
};

export default CustomSelect;

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <span className="custom-select__icon">
      <svg width="15" height="6" aria-hidden="true">
        <use xlinkHref="#arrow-down"></use>
      </svg>
    </span>
  </components.DropdownIndicator>
);
