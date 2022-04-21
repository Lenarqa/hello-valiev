import React from "react";
import style from "./Input.module.css";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import MsgWindow from "../msgWindow/MsgWindow";

interface IInput {
    type?:string;
    labelTitle:string;
    id:string;
    placeholder: string;
    isError: boolean;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    value:string;
    dataIsError?:boolean;
    dataIsUnknownUser?:boolean;
    dataHasData?:boolean;
    mouseOverHandler: ()=>void;
    mouseOutHandler: ()=>void;
    isHover: boolean;
    errorMsg: string;
}

const Input: React.FC<IInput> = (props) => {
  return (
    <div className={style.formItem} data-type={props.type}>
      <label htmlFor={props.id}>{props.labelTitle}</label>
      <div className={style.inputWrapper}>
        <input
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          data-is-error={props.dataIsError}
          data-is-unknown-user={props.dataIsUnknownUser}
          data-has-data={props.dataHasData}
        />
        <div className={style.icons}>
          {props.isError && (
            <InfoIcon
              className={style.icon}
              onMouseOver={props.mouseOverHandler}
              onMouseOut={props.mouseOutHandler}
            />
          )}
          {props.isHover && (
            <MsgWindow style={style.hoverMsg}>{props.errorMsg}</MsgWindow>
          )}
        </div>
      </div>
    </div>
  );
};
export default Input;
