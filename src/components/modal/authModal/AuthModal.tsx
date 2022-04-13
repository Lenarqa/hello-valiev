import React, { useState, useEffect } from "react";
import style from "./AuthModal.module.css";
import Button from "../../UI/button/Button";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";
import MsgWindow from "../../UI/msgWindow/MsgWindow";

interface IAuthModal {
  isFooterErrMsg: boolean;
  showFooterErrMsg: (value: boolean) => void;
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

  useEffect(() => {
    if (!isEmailError && !isPasswordError) {
      setBtnIsDisable(false);
    }

    if (email.trim().length === 0 || password.trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [isEmailError, isPasswordError, email, password]);

  // helper function
  const setErrorEmail = (errorMsg: string) => {
    setIsEmailError(true);
    setEmailErrorMsg(errorMsg);
  };

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const emailValidation =
      /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;
    const newValue = e.currentTarget.value;
    setEmailErrorMsg("");
    setEmail(newValue);
    setIsEmailError(false);
    setBtnIsDisable(true);
    props.showFooterErrMsg(false);

    if (newValue.trim().length === 0) {
      setErrorEmail("Поле не может быть пустым");
      return;
    }

    if (/,/.test(newValue)) {
      setErrorEmail("Email не может содержать в себе запятых");
      return;
    }

    if (!/^(?=[a-zA-Z0-9])/.test(newValue)) {
      setErrorEmail(
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
      setErrorEmail(
        "Количество символов до знака @ не может быть длиннее 25 символов"
      );
      return;
    }

    if (!/@/.test(newValue)) {
      setErrorEmail("Email обязан содержать в себе символ @");
      return;
    }

    // text lenght after @ and before (.com/.ru) can`t be > 25
    if (
      (newValue.includes("@") &&
        newValue.split("@")[1].split(".")[0].length > 25) ||
      (newValue.includes("@") &&
        newValue.split("@")[1].split(".")[0].length < 1)
    ) {
      setErrorEmail(
        "Количество символов после знака @ не может быть больше 25 символов и меньше 1"
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
      setErrorEmail(
        "Email обязательно должен содержать домен (.ru/com и т.д). Домен не может быть короче 2 символов и длиннее 4"
      );
      return;
    }

    //final check, check
    if (!emailValidation.test(newValue)) {
      setErrorEmail(
        "Email не может включать в себе кирилицу, используйте только латинский алфавит"
      );
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon и иконка исчезает
    // чтобы не оставалось окно с описанием ошибки без сообщения, выключаем ховер
    if (emailValidation.test(newValue)) {
      setIsHoverEmail(false);
    }
  };

  // helper function
  const setErrorPassword = (errorMsg: string) => {
    setIsPasswordError(true);
    setPasswordErrorMsg(errorMsg);
  };

  const passwordValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const passwordValidation =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;

    const newValue = e.currentTarget.value;
    setPasswordErrorMsg("");
    setPassword(newValue);
    setIsPasswordError(false);
    setBtnIsDisable(true);
    props.showFooterErrMsg(false)

    if (newValue.trim().length === 0) {
      setErrorPassword("Поле не может быть пустым");
      return;
    }

    if (!/.*\d/.test(newValue)) {
      setErrorPassword("Пароль должен содержать цифры");
      return;
    }

    if (!/.*[a-z]/.test(newValue)) {
      setErrorPassword(
        "Пароль должен содержать латинские буквы нижнего регистра"
      );
      return;
    }

    if (!/.*[A-Z]/.test(newValue)) {
      setErrorPassword(
        "Пароль должен содержать латинские буквы верхнего регистра"
      );
      return;
    }

    if (!/.*\W/.test(newValue)) {
      setErrorPassword("Пароль должен содержать символы (например !№%:?)");
      return;
    }

    if (newValue.length < 8 || newValue.length > 24) {
      setErrorPassword(
        "Пароль не может быть короче 8 символов и длиннее 24 символов"
      );
      return;
    }

    // \W это аналог ([^a-zA-Z0-9_]) он позволяет вводить кириллицу
    // я не думаю что в пароле должна быть кириллица поэтому добавил проверку
    // если кириллица в пароле все таки имеет место быть я уберу эту проверку.
    if (/[а-яА-ЯёЁ]/.test(newValue)) {
      setErrorPassword(
        "Пароль не может содержать кириллицу, используйте только латиницу"
      );
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon и иконка исчезает
    // чтобы не оставалось окно с описанием ошибки без сообщения, выключаем ховер
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
      props.showFooterErrMsg(true);
    }
  };

  const passwordRecoveryModalHandler = () => {
    props.showFooterErrMsg(false);
    props.showPasswordRecoveryModal();
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
            data-isError={isEmailError}
            data-isUnknownUser={props.isFooterErrMsg}
            data-hasData={!isEmailError && email.trim().length > 0}
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
            data-isError={isPasswordError}
            data-isUnknownUser={props.isFooterErrMsg}
            data-hasData={!isPasswordError && password.trim().length > 0}
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
      <Button
        type="submit"
        isDisable={btnIsDisable}
        onClick={() => submitHandler.bind(this)}
      >
        Войти
      </Button>
      <button
        type="button"
        className={style.btn}
        onClick={passwordRecoveryModalHandler}
      >
        Забыли пароль?
      </button>
    </form>
  );
};

export default AuthModal;
