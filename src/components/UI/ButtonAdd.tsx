import React from "react";
import styled from "styled-components";
import plus from "../../assets/icons/plus.svg";

interface IButton {
  isDisabled?: boolean;
}

const Button = styled.button<IButton>`
  cursor: pointer;
  height: 52px;
  width: 220px;
  padding: 17px 28px;
  background-color: #585cc6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Gilroy";
  font-weight: 600;
  border: none;
  border-radius: 2px;

  &:disabled {
    background-color: #8A8A8A;
  }

`;

interface IButtonAdd {
  onClick: () => void;
  isDisabled?: boolean;
}

const ButtonAdd: React.FC<IButtonAdd> = (props) => {
  return (
    <Button onClick={props.onClick} isDisabled={props.isDisabled} disabled={props.isDisabled}>
      <img src={plus} style={{ marginRight: 12 }} />
      {props.children}
    </Button>
  );
};
export default ButtonAdd;
