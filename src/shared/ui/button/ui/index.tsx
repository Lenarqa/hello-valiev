import React from "react";
import style from "./index.module.css";
import plus from "../assets/plus.svg";

interface IButton {
  onClick?: () => void;
  style?: string;
  type?: string;
  isDisable?: boolean;
}

export const Button: React.FC<IButton> = (props) => {
  return (
    <button
      data-type={props.type}
      disabled={props.isDisable}
      className={`${props.style} ${style.button} `}
      onClick={props.onClick}
    >
      <img src={plus} className={style.icon} />
      {props.children}
    </button>
  );
};

