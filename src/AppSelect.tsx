import {
  ChangeEvent,
  MouseEvent,
  SelectHTMLAttributes,
  useRef,
  useState,
} from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';
import ChevronIcon from './img/icon-chevron.svg';
import { useClickOutside } from './useClickOutside';

interface IOption {
  value: string;
  label: string;
}
interface IAppSelectProps extends SelectHTMLAttributes<HTMLElement> {
  options: IOption[];
  onChange: (value: any) => void;
  error?: FieldError;
  searchable?: boolean;
}

export default function AppSelect({
  options,
  value,
  placeholder,
  onChange,
  searchable = false,
  error,
}: IAppSelectProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState({
    value: value ?? '',
    label: placeholder ?? 'Выберите опцию',
  });
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpened(false));

  const handleSelectClick = () => setIsOpened(!isOpened);

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredOptions(
      options.filter((option) => option.label.includes(e.target.value))
    );
    onChange(e.target.value);
  };

  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
    onChange(e.currentTarget.value);
    setSelectedOption({
      value: e.currentTarget.value,
      label:
        options.find((option) => option.value === e.currentTarget.value)
          ?.label ??
        placeholder ??
        'Выберите опцию',
    });
    setIsOpened(false);
  };

  return (
    <Root $isOpened={isOpened} ref={ref}>
      <SelectWrapper>
        {searchable ? (
          <Select
            as="input"
            onClick={handleSelectClick}
            onChange={handleSelectChange}
            value={value}
            placeholder={placeholder}
          />
        ) : (
          <Select onClick={handleSelectClick}>{selectedOption.label}</Select>
        )}
      </SelectWrapper>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <OptionList>
        <li>
          <Option onClick={handleOptionClick} value="">
            {placeholder ?? 'Выберите опцию'}
          </Option>
        </li>
        {filteredOptions &&
          filteredOptions.map((option) => (
            <li key={option.value}>
              <Option value={option.value} onClick={handleOptionClick}>
                {option.label}
              </Option>
            </li>
          ))}
      </OptionList>
    </Root>
  );
}

const Select = styled.div`
  width: 100%;
  padding: 11px 21px;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75rem;
  text-align: left;

  background-color: #f9f9f9;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  cursor: 'pointer';

  &::placeholder {
    color: #000;
  }
`;

const SelectWrapper = styled.div`
  position: relative;

  &::after {
    position: absolute;
    top: 50%;
    right: 30px;
    content: '';

    width: 15px;
    height: 8px;

    background-image: url(${ChevronIcon});
    background-size: 15px 8px;
    background-repeat: no-repeat;
  }
`;

const Option = styled.button`
  width: 100%;
  padding: 11px 21px;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75rem;
  text-align: left;

  background-color: #f9f9f9;
  border: none;

  &:hover {
    background-color: #ffffff;
  }
`;

const OptionList = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 1;

  display: none;
  width: 100%;
  max-height: 250px;
  margin: 0;
  padding: 0;

  border: 1px solid #e6e6e6;
  border-radius: 5px;
  list-style: none;
  overflow-y: auto;
`;

const Root = styled.div<{ $isOpened: boolean }>`
  position: relative;

  padding-bottom: 24px;

  ${SelectWrapper}::after {
    transform: translateY(-50%)
      ${({ $isOpened }) => $isOpened && 'rotate(180deg)'};
  }

  ${OptionList} {
    display: ${({ $isOpened }) => $isOpened && 'block'};
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  /* top: calc(100% + 6px); */
  bottom: 0;
  left: 0;

  margin: 0;

  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-error);
`;
