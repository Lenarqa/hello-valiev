import React, { useState } from "react";
import style from "./AuthModal.module.css";
import BlueButton from "../../UI/Button/Button";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";
import MsgWindow from "../../UI/MsgWindow/MsgWindow";

const AuthModal: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [isHoverEmailMsg, setIsHoverEmailMsg] = useState<boolean>(false);

  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const emailValidation =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmailErrorMsg("");
    setEmail(newValue);
    setIsEmailError(false);

    if (newValue.trim().length === 0) {
      setIsEmailError(true);
      setEmailErrorMsg("Поле не может быть пустым");
      return;
    }

    if (/,/.test(newValue)) {
      setIsEmailError(true);
      setEmailErrorMsg("Email не может содержать в себе запятых");
      return;
    }

    if (!/^(?=[a-zA-Z0-9])/.test(newValue)) {
      setIsEmailError(true);
      setEmailErrorMsg(
        "Email не может начинаться с символа, только с числа или латинских букв, любого регистра"
      );
      return;
    }

    if (
      (!newValue.includes("@") && newValue.length > 25) ||
      newValue.split("@")[0].length > 25
    ) {
      setIsEmailError(true);
      setEmailErrorMsg(
        "Количество символов до знака @ не может быть длиннее 25"
      );
      return;
    }

    if (!newValue.includes("@") && newValue.length > 25) {
      setIsEmailError(true);
      setEmailErrorMsg(
        "Количество символов до знака @ не может быть длиннее 25 символов"
      );
      return;
    }

    if (!/@/.test(newValue)) {
      setIsEmailError(true);
      setEmailErrorMsg("Email обязан содержать в себе символ @");
      return;
    }

    // text lenght after @ and before (.com/.ru) can`t be > 25
    if (
      (newValue.includes("@") &&
        newValue.split("@")[1].split(".")[0].length > 25) ||
      (newValue.includes("@") &&
        newValue.split("@")[1].split(".")[0].length < 1)
    ) {
      setIsEmailError(true);
      setEmailErrorMsg(
        "Количество символов после знака @ не может быть больше 25 символов и короче 1"
      );
      return;
    }

    // Email need to include domain.
    if (
      (newValue.includes("@") &&
        newValue.split("@")[1].includes(".") &&
        (newValue.split("@")[1].split(".")[1].length < 2 ||
          newValue.split("@")[1].split(".")[1].length > 4)) ||
      (newValue.includes("@") && !newValue.split("@")[1].includes("."))
    ) {
      setIsEmailError(true);
      setEmailErrorMsg(
        "Email обязательно должен содержать домен (.ru/com и т.д). Домен не может быть короче 2 символов и длиннее 4"
      );
      return;
    }

    //final check, check
    if (!emailValidation.test(newValue)) {
      setIsEmailError(true);
      setEmailErrorMsg(
        "Email не может включать в себе кирилицу или другие другие алфавиты, используйте только латиницу"
      );
      return;
    }
  };

  const showPasswordHandler = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const emailMouseOutHandler = () => {
    setIsHoverEmailMsg(false);
  };

  const emailMouseOverHandler = () => {
    setIsHoverEmailMsg(true);
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
            {isEmailError && (
              <InfoIcon
                className={style.icon}
                onMouseOver={emailMouseOverHandler}
                onMouseOut={emailMouseOutHandler}
              />
            )}
            {isHoverEmailMsg && (
              <MsgWindow style={style.hoverEmailMsg}>{emailErrorMsg}</MsgWindow>
            )}
          </div>
        </div>
      </div>
      <div className={style.formItem}>
        <label htmlFor="password">Пароль</label>
        <div className={style.inputWrapper}>
          <input
            id="password"
            placeholder="Введите пароль"
            type={isVisiblePassword ? "text" : "password"}
          />
          <div className={style.icons}>
            {isVisiblePassword ? (
              <CloseEyeIcon
                className={style.icon}
                onClick={showPasswordHandler}
              />
            ) : (
              <OpenEyeIcon
                className={style.icon}
                onClick={showPasswordHandler}
              />
            )}
            {isPasswordError && <InfoIcon className={style.icon} />}
          </div>
        </div>
      </div>
      <BlueButton>Войти</BlueButton>
      <div className={style.text}>Забыли пароль?</div>
    </form>
  );
};
export default AuthModal;
