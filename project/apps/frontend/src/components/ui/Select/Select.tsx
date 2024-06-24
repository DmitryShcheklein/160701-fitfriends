import Select, { components, Props } from 'react-select';
import { customStyles } from './styles';

interface CustomSelectProps extends Props {
  label?: string;
}
const CustomSelect = (props: CustomSelectProps) => {
  const { value, label } = props;

  return (
    <div
      className={`custom-select ${
        value ? 'custom-select--selected' : 'custom-select--not-selected'
      }`}
    >
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
