import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 17px 28px;
  background-color: #585cc6;
  color: #ffffff;
  font-family: "Gilroy";
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 2px;
`;

interface IButton {
  onClick: ()=>void;
}

const HeaderButton: React.FC<IButton> = (props) => {
  return <Button onClick={props.onClick}>{props.children}</Button>;
};
export default HeaderButton;
