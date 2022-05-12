import React from "react";
import style from "./MyInput.module.css";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import MsgWindow from "../myMsgWindow/MsgWindow";

interface IInput {
  id?: string;
  type?: string;
  labelTitle?: string;
  placeholder?: string;
  isError?: boolean;
  inputType?: string;
  register: any;
  error?:string | undefined;
  style?:string;
}

const MyInput: React.FC<IInput> = (props) => {
  return (
    <div
      className={style.formItem}
      data-type={props.type}
    //   data-input-type={props.inputType}
      data-style={props.style}
    >
      <label htmlFor={props.id}>{props.labelTitle}</label>
      <div className={style.inputWrapper}>
        <input
          type={props.inputType}
          id={props.id}
          placeholder={props.placeholder}
          {...props.register}
        />
        <div className={style.icons}>
          {props.error && <InfoIcon className={style.icon} />}
          <MsgWindow style={style.hoverMsg}>{props.error}</MsgWindow>
        </div>
      </div>
    </div>
  );
};

export default MyInput;
