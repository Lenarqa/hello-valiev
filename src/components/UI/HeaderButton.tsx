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
  font-family: "Gilroy-Regular", sans-serif;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 2px;
`;

const HeaderButton: React.FC = (props) => {
  return <Button>{props.children}</Button>;
};
export default HeaderButton;
