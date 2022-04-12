import React, { useState, useEffect } from "react";
import style from "./AuthModal.module.css";
import Button from "../../UI/Button/Button";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";
import MsgWindow from "../../UI/MsgWindow/MsgWindow";

interface IAuthModal {
  isFooterErrMsg: boolean;
  showFooterErrMsg: () => void;
  hideFooterErrMsg: () => void;
  showPasswordRecoveryModal: () => void;
}

const AuthModal: React.FC<IAuthModal> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [isHoverEmail, setIsHoverEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [isHoverPassword, setIsHoverPassword] = useState<boolean>(false);

  const [btnIsDisable, setBtnIsDisable] = useState<boolean>(true);

  // input styling
  let emailInputStyle = isEmailError ? style.errorInput : "";
  let passwordInputStyle = isPasswordError
    ? `${style.passwordInput} ${style.errorInput} `
    : style.passwordInput;

  if (props.isFooterErrMsg) {
    emailInputStyle = style.error;
    passwordInputStyle = style.error;
  }

  useEffect(() => {
    if (!isEmailError && !isPasswordError) {
      setBtnIsDisable(false);
    }

    if (email.trim().length === 0 || password.trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [isEmailError, isPasswordError, email, password]);

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const emailValidation =
      /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;
    const newValue = e.currentTarget.value;
    setEmailErrorMsg("");
    setEmail(newValue);
    setIsEmailError(false);
    setBtnIsDisable(true);
    props.hideFooterErrMsg();

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
        "Email не может включать в себе кирилицу или другие алфавиты, используйте только латиницу"
      );
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon и иконка исчезает
    // чтобы не оставалось окно без сообщения, когда нет ошибок
    if (emailValidation.test(newValue)) {
      setIsHoverEmail(false);
    }
  };

  const passwordValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const passwordValidation =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;

    const newValue = e.currentTarget.value;
    setPasswordErrorMsg("");
    setPassword(newValue);
    setIsPasswordError(false);
    setBtnIsDisable(true);
    props.hideFooterErrMsg();

    if (newValue.trim().length === 0) {
      setIsPasswordError(true);
      setPasswordErrorMsg("Поле не может быть пустым");
      return;
    }

    if (newValue.trim().length === 0) {
      setIsPasswordError(true);
      setPasswordErrorMsg("Поле не может быть пустым");
      return;
    }

    if (!/.*\d/.test(newValue)) {
      setIsPasswordError(true);
      setPasswordErrorMsg("Пароль должен содержать цифры");
      return;
    }

    if (!/.*[a-z]/.test(newValue)) {
      setIsPasswordError(true);
      setPasswordErrorMsg(
        "Пароль должен содержать латинские буквы нижнего регистра"
      );
      return;
    }

    if (!/.*[A-Z]/.test(newValue)) {
      setIsPasswordError(true);
      setPasswordErrorMsg(
        "Пароль должен содержать латинские буквы верхнего регистра"
      );
      return;
    }

    if (!/.*\W/.test(newValue)) {
      setIsPasswordError(true);
      setPasswordErrorMsg("Пароль должен содержать символы (например !№%:?)");
      return;
    }

    if (newValue.length < 8 || newValue.length > 24) {
      setIsPasswordError(true);
      setPasswordErrorMsg(
        "Пароль не может быть короче 8 символов и длиннее 24 символов"
      );
      return;
    }

    // \W это аналог ([^a-zA-Z0-9_]) он позволяет вводить кириллицу
    // я не думаю что в пароле должна быть кириллица поэтому добавил проверку
    // если кириллица в пароле все таки имеет место быть я уберу эту проверку.
    if (/[а-яА-ЯёЁ]/.test(newValue)) {
      setIsPasswordError(true);
      setPasswordErrorMsg("Пароль может содержать только латинские буквы");
      return;
    }

    if (!passwordValidation.test(newValue)) {
      setIsPasswordError(true);
      setPasswordErrorMsg("Что то пошло не так");
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon
    // чтобы не оставалось окно без сообщения, когда нет ошибок
    if (passwordValidation.test(newValue)) {
      setIsHoverPassword(false);
    }
  };

  const showPasswordHandler = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const emailMouseOutHandler = () => {
    setIsHoverEmail(false);
  };

  const emailMouseOverHandler = () => {
    setIsHoverEmail(true);
  };

  const passwordMouseOutHandler = () => {
    setIsHoverPassword(false);
  };

  const passwordMouseOverHandler = () => {
    setIsHoverPassword(true);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "enter@gmail.com" && password === "Enter123!") {
      alert("Добро пожаловать!");
    } else {
      setBtnIsDisable(true);
      props.showFooterErrMsg();
    }
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <h2>Войти</h2>
      <div className={style.formItem}>
        <label htmlFor="login">Логин</label>
        <div className={style.inputWrapper}>
          <input
            id="login"
            placeholder="Введите логин"
            onChange={emailValidationHandler}
            value={email}
            className={emailInputStyle}
          />
          <div className={style.icons}>
            {isEmailError && (
              <InfoIcon
                className={style.icon}
                onMouseOver={emailMouseOverHandler}
                onMouseOut={emailMouseOutHandler}
              />
            )}
            {isHoverEmail && (
              <MsgWindow style={style.hoverMsg}>{emailErrorMsg}</MsgWindow>
            )}
          </div>
        </div>
      </div>
      <div className={style.formItem}>
        <label htmlFor="password">Пароль</label>
        <div className={style.inputWrapper}>
          <input
            className={passwordInputStyle}
            id="password"
            placeholder="Введите пароль"
            type={isVisiblePassword ? "text" : "password"}
            onChange={passwordValidationHandler}
            value={password}
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
            {isPasswordError && !props.isFooterErrMsg && (
              <InfoIcon
                className={style.icon}
                onMouseOver={passwordMouseOverHandler}
                onMouseOut={passwordMouseOutHandler}
              />
            )}
            {isHoverPassword && (
              <MsgWindow style={style.hoverMsg}>{passwordErrorMsg}</MsgWindow>
            )}
          </div>
        </div>
      </div>
      <Button type="submit" isDisable={btnIsDisable}>
        Войти
      </Button>
      <button
        type="button"
        className={style.btn}
        onClick={props.showPasswordRecoveryModal}
      >
        Забыли пароль?
      </button>
    </form>
  );
};
export default AuthModal;
