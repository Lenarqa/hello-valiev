import React from "react";
import style from "./ErrorMsg.module.css";
import { ReactComponent as ErrorIcon } from "../../../assets/icons/error.svg";

const ErrorMsg: React.FC = (props) => {
  return (
    <div className={style.error}>
      <ErrorIcon className={style.icon} />
      <div className={style.text}>{props.children}</div>
    </div>
  );
};
export default ErrorMsg;
