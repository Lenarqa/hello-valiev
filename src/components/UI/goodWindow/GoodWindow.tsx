import React from "react";
import style from "./GoodWindow.module.css";
import { ReactComponent as Success } from "../../../assets/icons/success.svg";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import { ReactComponent as GreenBubbles } from "../../../assets/img/greenBubbles.svg";

interface IGoogWindow {
  title: string;
  text: string;
  setShowGoodWindow: (value: boolean) => void;
}

const GoodWindow: React.FC<IGoogWindow> = ({
  title,
  text,
  setShowGoodWindow,
}) => {
  return (
    <div className={style.goodWindow}>
      <Success className={style.icon} />
      <GreenBubbles className={style.greenBubblesBg} />
      <div className={style.info}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Close
        className={style.closeIcon}
        onClick={() => {
          setShowGoodWindow(false);
        }}
      />
    </div>
  );
};

export default GoodWindow;
