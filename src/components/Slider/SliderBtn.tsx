import React from "react";
import styled from "styled-components";

interface IStyledBtn {
  isReverse: boolean;
  disabled: boolean;
}

const StiledBtn = styled.button<IStyledBtn>`
  width: 56px;
  height: 56px;
  background-color: ${props => props.disabled ? "rgba(224, 224, 224, 1)": "#ffffff"};
  border: none;
  margin-right: 16px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    border: 2px solid #333333;
    border-radius: 1px;
    border-left: ${(props) => (props.isReverse ? "" : "none")};
    border-bottom: ${(props) => (props.isReverse ? "" : "none")};

    border-top: ${(props) => (props.isReverse ? "none" : "")};
    border-right: ${(props) => (props.isReverse ? "none" : "")};
    position: relative;
    transition: all 0.5s ease;
  }

  div:hover {
    border-color: rgba(88, 92, 198, 1);
  }

  div:hover:before {
    background-color: rgba(88, 92, 198, 1);
  }

  div::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 16px;
    bottom: ${(props) => (props.isReverse ? "-3px" : "-5px")};
    right: ${(props) => (props.isReverse ? "2px" : "4px")};
    transform: rotate(45deg);
    background-color: #333333;
    transition: all 0.5s ease;
  }
`;

interface ISliderBtn {
  isReverce: boolean;
  onClick: (isReverce: boolean) => void;
  disabled: boolean;
}

const SliderBtn: React.FC<ISliderBtn> = (props) => {
  return (
    <StiledBtn isReverse={props.isReverce} onClick={props.onClick.bind(this, props.isReverce)} disabled={props.disabled}>
      <div />
    </StiledBtn>
  );
};
export default SliderBtn;
