import React from "react";
import style from "./HeaderButton.module.css";

interface IButton {
  onClick: ()=>void;
}

const HeaderButton: React.FC<IButton> = (props) => {
  return <button className={style.button} onClick={props.onClick}>{props.children}</button>;
};

export default HeaderButton;
