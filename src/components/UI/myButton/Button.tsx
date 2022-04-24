import React from "react";
import style from "./Button.module.css";

interface IButton {
  onClick?: () => void;
  style?: string;
  type?: string;
  isDisable?: boolean;
}

const Button: React.FC<IButton> = (props) => {
  return (
    <button
      data-type={props.type}
      disabled={props.isDisable}
      className={`${props.style} ${style.button} `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
