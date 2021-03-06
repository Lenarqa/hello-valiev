import React from "react";
import style from "./Input.module.css";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import MsgWindow from "../myMsgWindow/MsgWindow";

interface IInput {
  id: string;
  value?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  type?: string;
  labelTitle?: string;
  placeholder?: string;
  isError?: boolean;
  dataIsError?: boolean;
  dataIsUnknownUser?: boolean;
  dataHasData?: boolean;
  mouseOverHandler?: () => void;
  mouseOutHandler?: () => void;
  isHover?: boolean;
  errorMsg?: string;
  inputType?: string;
  required?: boolean;
  dataIsEdit?:boolean;
}

const Input: React.FC<IInput> = (props) => {
  return (
    <div
      className={style.formItem}
      data-type={props.type}
      data-input-type={props.inputType}
    >
      <label htmlFor={props.id}>{props.labelTitle}</label>
      <div className={style.inputWrapper}>
        <input
          type={props.inputType}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          data-is-error={props.dataIsError}
          data-is-unknown-user={props.dataIsUnknownUser}
          data-has-data={props.dataHasData}
          data-is-edit={props.dataIsEdit}
          required={props.required}
        />
        <div className={style.icons}>
          {props.isError && (
            <InfoIcon
              className={style.icon}
            />
          )}
            <MsgWindow style={style.hoverMsg}>{props.errorMsg}</MsgWindow>
        </div>
      </div>
    </div>
  );
};
export default Input;
