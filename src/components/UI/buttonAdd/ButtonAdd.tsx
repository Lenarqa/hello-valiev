import React from "react";
import style from "./ButtonAdd.module.css";
import plus from "../../../assets/icons/plus.svg";

interface IButtonAdd {
  onClick: () => void;
  isDisabled?: boolean;
}

const ButtonAdd: React.FC<IButtonAdd> = (props) => {
  return (
    <button className={style.button} onClick={props.onClick} disabled={props.isDisabled}>
      <img src={plus} className={style.icon} />
      {props.children}
    </button>
  );
};

export default ButtonAdd;
