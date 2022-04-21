import React from "react";
import style from "./Input.module.css";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import MsgWindow from "../msgWindow/MsgWindow";

const Input: React.FC = () => {
  return (
    <div className={style.formItem}>
      <label htmlFor="login">Логин</label>
      <div className={style.inputWrapper}>
        <input
          id="login"
          placeholder="Введите логин"
        //   onChange={emailValidationHandler}
        //   value={email}
        //   data-is-error={isEmailError}
        //   data-is-unknown-user={props.isFooterErrMsg}
        //   data-has-data={!isEmailError && email.trim().length > 0}
        />
        <div className={style.icons}>
          {/* {isEmailError && (
            <InfoIcon
              className={style.icon}
              onMouseOver={emailMouseOverHandler}
              onMouseOut={emailMouseOutHandler}
            />
          )}
          {isHoverEmail && (
            <MsgWindow style={style.hoverMsg}>{emailErrorMsg}</MsgWindow>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Input;
