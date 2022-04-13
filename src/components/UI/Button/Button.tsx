import React from "react";
import style from "./Button.module.css";

interface IButton {
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
  isDisable?: boolean;
}

const Button: React.FC<IButton> = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.isDisable}
      className={style.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
