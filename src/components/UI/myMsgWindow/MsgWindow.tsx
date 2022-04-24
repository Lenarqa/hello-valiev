import React from "react";
import style from "./MsgWindow.module.css";

interface IMsgWindow {
  style: string;
}

const MsgWindow: React.FC<IMsgWindow> = (props) => {
  const classes = style.msg + " " + props.style;
  return <div className={classes}>{props.children}</div>;
};
export default MsgWindow;
