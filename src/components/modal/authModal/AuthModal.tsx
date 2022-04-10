import React, { useState } from "react";
import style from "./AuthModal.module.css";
import BlueButton from "../../UI/Button/Button";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";

const AuthModal: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const emailValidation =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmail(newValue);
    if (emailValidation.test(email)) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  return (
    <form className={style.form}>
      <h2>Войти</h2>
      <div className={style.formItem}>
        <label htmlFor="login">Логин</label>
        <div className={style.inputWrapper}>
          <input
            id="login"
            placeholder="Введите логин"
            onChange={emailValidationHandler}
            value={email}
          />
          <div className={style.icons}>
            <InfoIcon className={style.icon} />
          </div>
        </div>
      </div>
      <div className={style.formItem}>
        <label htmlFor="password">Пароль</label>
        <div className={style.inputWrapper}>
          <input id="password" placeholder="Введите пароль" type="password" />
          <div className={style.icons}>
            {isVisiblePassword ? <CloseEyeIcon className={style.icon}  /> : <OpenEyeIcon className={style.icon} />}
            <InfoIcon className={style.icon} />
          </div>
        </div>
      </div>
      <BlueButton>Войти</BlueButton>
      <div className={style.text}>Забыли пароль?</div>
    </form>
  );
};
export default AuthModal;
