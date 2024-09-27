import { FC } from "react";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";

const AddButton = styled.button`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
`;

interface AddI {
  onClick: () => void;
}

const Add: FC<AddI> = ({ onClick }) => {
  return (
    <AddButton onClick={onClick}>
      <IoIosAdd fill="#fff" size={35} />
    </AddButton>
  );
};

export default Add;
