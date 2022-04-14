import React from "react";
import style from "./SliderBtn.module.css";

interface ISliderBtn {
  isReverce: boolean;
  onClick: (isReverce: boolean) => void;
  disabled: boolean;
}

const SliderBtn: React.FC<ISliderBtn> = (props) => {
  return (
    <button
      className={style.button}
      data-is-reverse={props.isReverce}
      onClick={props.onClick.bind(this, props.isReverce)}
      disabled={props.disabled}
    >
      <div />
    </button>
  );
};
export default SliderBtn;
