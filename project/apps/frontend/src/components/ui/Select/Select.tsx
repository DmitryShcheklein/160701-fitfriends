import React from 'react';
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from 'react-select';

interface CustomSelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  value: { value: string; label: string } | null;
  onChange: (selectedOption: { value: string; label: string } | null) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  // Кастомизация компонента SingleValue
  const SingleValue = (props: SingleValueProps<any>) => (
    <components.SingleValue {...props}>
      <span className="custom-select__text1">{props.data.label}</span>
    </components.SingleValue>
  );

  // Кастомизация компонента Option
  const Option = (props: OptionProps<any>) => (
    <components.Option {...props}>
      <span className="custom-select__list-item1">{props.data.label}</span>
    </components.Option>
  );

  // Кастомизация компонента DropdownIndicator
  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <span className="custom-select__icon">
        <svg width="15" height="6" aria-hidden="true">
          <use xlinkHref="#arrow-down"></use>
        </svg>
      </span>
    </components.DropdownIndicator>
  );

  // Кастомизация контейнера Select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      minHeight: 'auto',
      height: 'auto',
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: '0',
    }),
    input: (base: any) => ({
      ...base,
      margin: '0',
      padding: '0',
    }),
    placeholder: (base: any) => ({
      ...base,
      margin: '0',
      padding: '0',
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      padding: '0',
    }),
    menu: (base: any) => ({
      ...base,
      marginTop: '0',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: '0',
    }),
  };

  return (
    <div
      className={`custom-select ${
        value ? 'custom-select--selected' : 'custom-select--not-selected'
      }`}
    >
      <span className="custom-select__label">Ваша локация</span>
      <Select
        components={{ SingleValue, Option, DropdownIndicator }}
        // styles={customStyles}
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        classNamePrefix="custom-select"
        isClearable
      />
    </div>
  );
};

export default CustomSelect;
