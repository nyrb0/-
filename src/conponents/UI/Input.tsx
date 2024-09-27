import { ChangeEvent, FC } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  all: unset;
  width: 100%;
  background: transparent;
  border-bottom: 1px solid #fff;
  outline: none;
`;

interface InputI {
  value: string;
  change: (v: string) => void;
  placeholder: string;
}

const Input: FC<InputI> = ({ value, change, placeholder }) => {
  const changeValue = (v: ChangeEvent<HTMLInputElement>) => {
    change(v.target.value);
  };
  return (
    <InputStyled
      value={value}
      onChange={changeValue}
      placeholder={placeholder}
    />
  );
};

export default Input;
