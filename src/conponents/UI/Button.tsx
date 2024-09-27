import { FC, ReactNode } from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: red;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
  }
`;

interface ButtonI {
  children: ReactNode;
  onClick: () => void;
  dis?: boolean;
}

const Button: FC<ButtonI> = ({ children, onClick, dis }) => {
  return (
    <ButtonStyled disabled={dis} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
