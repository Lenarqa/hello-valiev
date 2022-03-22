import React from "react";
import styled from "styled-components";
import plus from "../../assets/icons/plus.svg";

const Button = styled.div`
  height: 52px;
  width: 220px;
  padding: 17px 28px;
  background-color: #585cc6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Gilroy-Regular", sans-serif;
  font-weight: 600;
  border-radius: 2px;
`;

const ButtonAdd: React.FC = (props) => {
  return (
    <Button>
      <img src={plus} style={{ marginRight: 12 }} />
      {props.children}
    </Button>
  );
};
export default ButtonAdd;
