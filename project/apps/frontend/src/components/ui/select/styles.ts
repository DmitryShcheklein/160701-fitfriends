export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    padding: '0px 20px',
    backgroundColor: state.isDisabled
      ? 'rgba(174, 174, 174, 0.08)'
      : state.isFocused || state.hasValue
      ? 'transparent'
      : 'transparent',
    border: state.isDisabled
      ? '1px solid rgba(24, 24, 24, 0.08)'
      : state.isFocused || state.hasValue
      ? '1px solid rgba(24, 24, 24, 0.1)'
      : '1px solid rgba(24, 24, 24, 0.1)',
    borderRadius: '8px',
    boxShadow: state.isFocused ? '0 0 0 2px #c5ec2a' : 'none',
    cursor: 'pointer',
    transition:
      'border 0.3s ease, color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
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
  placeholder: (base: any, state: any) => ({
    ...base,
    position: 'absolute',
    bottom: '17px',
    left: '20px',
    color: state.isDisabled ? 'rgba(51, 51, 51, 0.5)' : '#333333',
    pointerEvents: 'none',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    padding: '0',
  }),
  indicatorContainer: (base: any) => ({
    ...base,
    padding: '0',
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  menu: (base: any) => ({
    ...base,
    marginTop: 6,
    border: '1px solid #CFCFCF',
    borderRadius: 8,
    padding: '2px',
    maxHeight: '275px',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    padding: 16,
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? '#d5ff2d'
      : state.isFocused
      ? 'rgba(0, 0, 0, 0.4)'
      : 'transparent',
    color: '#000',
    transition: 'background-color 0.3s ease',
    borderRadius: 8,
    marginBottom: 1,
  }),
};
