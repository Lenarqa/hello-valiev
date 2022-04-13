import React from "react";
import style from "./BadWindow.module.css";
import { ReactComponent as BadIcon } from "../../../assets/icons/bad.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close2.svg";
import { ReactComponent as RedBubblesBg } from "../../../assets/img/redBubbles.svg";

interface IBadWindow {
  title: string;
  text: string;
  setShowBadWindow: (value: boolean) => void;
}

const BadWindow: React.FC<IBadWindow> = ({ title, text, setShowBadWindow }) => {
  return (
    <div className={style.goodWindow}>
        <BadIcon className={style.icon} />
        <RedBubblesBg className={style.redBubblesBg} />
        <div className={style.info}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <CloseIcon
          className={style.closeIcon}
          onClick={() => {
            setShowBadWindow(false);
          }}
        />
    </div>
  );
};

export default BadWindow;
