import { SelectHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import ChevronIcon from './img/icon-chevron.svg';

interface IOption {
  value: string;
  label: string;
}
interface IAppSelectProps extends SelectHTMLAttributes<HTMLElement> {
  options: IOption[];
}

export default function AppSelect({ options }: IAppSelectProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleSelectClick = () => setIsOpened(!isOpened);

  return (
    <Root $isOpened={isOpened}>
      <Select onClick={handleSelectClick}></Select>
      <ErrorMessage>Тестовое сообщение</ErrorMessage>
      <OptionList>
        {options &&
          options.map((option) => (
            <li>
              <Option value={option.value}>{option.label}</Option>
            </li>
          ))}
      </OptionList>
    </Root>
  );
}

const SelectInput = styled.div``;

const Select = styled.div`
  position: relative;

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

  ${Select}::after {
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
