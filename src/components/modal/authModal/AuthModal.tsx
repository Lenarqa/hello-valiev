import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AuthModal.module.css";
import Button from "../../UI/myButton/Button";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";
import MsgWindow from "../../UI/myMsgWindow/MsgWindow";
import Input from "../../UI/input/Input";
import {
  EmailValidationRegEx,
  passwordValidationRegEx,
} from "../../../shared/lib/validation/regEx";
import {
  emailValidation,
  passwordValidation,
} from "../../../shared/lib/validation/AuthValidation";
import { IValidationResult } from "../../../shared/models/models";

import { authStore } from "../../../shared/effector/auth";
import { useStore } from "effector-react";
import LoadingSpiner from "../../UI/loadingSpiner/LoadingSpiner";

interface IAuthModal {
  isFooterErrMsg: boolean;
  showFooterErrMsg: (value: boolean) => void;
  setFooterErrMsg: (value: string) => void;
}

const AuthModal: React.FC<IAuthModal> = (props) => {
  const navigate = useNavigate();
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

  const auth = useStore(authStore.$token);
  const isLoading = useStore(authStore.$isLoading);

  useEffect(() => {
    if (!isEmailError && !isPasswordError) {
      setBtnIsDisable(false);
    }

    if (email.trim().length === 0 || password.trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [isEmailError, isPasswordError, email, password]);

  useEffect(() => {
    if (auth?.statusCode === 500) {
      console.log(auth)
      props.setFooterErrMsg("Такого пользователя не существует");
      props.showFooterErrMsg(true);
    } else if (auth?.statusCode === 400) {
      props.setFooterErrMsg("Неправильный пароль!");
      props.showFooterErrMsg(true);
    } else if (auth.accessToken) {
      localStorage.setItem("auth", auth);
      props.showFooterErrMsg(false);
      navigate(`/hello-valiev/about-me`);
    } else if(auth?.statusCode){
      props.setFooterErrMsg(auth?.message);
      props.showFooterErrMsg(true);
    }
  }, [auth]);

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmailErrorMsg("");
    setEmail(newValue);
    setIsEmailError(false);
    setBtnIsDisable(true);
    props.showFooterErrMsg(false);

    const res: IValidationResult = emailValidation(newValue);

    if (res.result) {
      setIsEmailError(true);
      setEmailErrorMsg(res.errorMsg);
      return;
    }

    if (EmailValidationRegEx.test(newValue)) {
      setIsHoverEmail(false);
    }
  };

  const passwordValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPasswordErrorMsg("");
    setPassword(newValue);
    setIsPasswordError(false);
    setBtnIsDisable(true);
    props.showFooterErrMsg(false);

    const res: IValidationResult = passwordValidation(newValue);
    if (res.result) {
      setIsPasswordError(true);
      setPasswordErrorMsg(res.errorMsg);
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon и иконка исчезает
    // чтобы не оставалось окно с описанием ошибки без сообщения, выключаем ховер
    if (passwordValidationRegEx.test(newValue)) {
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
    if (
      EmailValidationRegEx.test(email) &&
      passwordValidationRegEx.test(password)
    ) {
      authStore.getToken({ email: email, password: password });
      if (auth?.statusCode === 500) {
        props.showFooterErrMsg(true);
      } else {
        localStorage.setItem("auth", auth);
        props.showFooterErrMsg(false);
        navigate(`/hello-valiev/about-me`);
      }
    }
  };

  const passwordRecoveryModalHandler = () => {
    props.showFooterErrMsg(false);
    navigate(`/hello-valiev/passwordRecovery`);
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <h2>Войти</h2>
          <Input
            labelTitle="Логин"
            id="login"
            placeholder="Введите логин"
            onChange={emailValidationHandler}
            value={email}
            dataIsError={isEmailError}
            dataIsUnknownUser={props.isFooterErrMsg}
            dataHasData={!isEmailError && email.trim().length > 0}
            mouseOverHandler={emailMouseOverHandler}
            mouseOutHandler={emailMouseOutHandler}
            isHover={isHoverEmail}
            errorMsg={emailErrorMsg}
            isError={isEmailError}
          />
          <div className={style.formItem}>
            <label htmlFor="password">Пароль</label>
            <div className={style.inputWrapper}>
              <input
                data-is-error={isPasswordError}
                data-is-unknown-user={props.isFooterErrMsg}
                data-has-data={!isPasswordError && password.trim().length > 0}
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
                  <MsgWindow style={style.hoverMsg}>
                    {passwordErrorMsg}
                  </MsgWindow>
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            style={style.enterBtn}
            isDisable={btnIsDisable}
            // onClick={() => submitHandler.bind(this)}
            onClick={() =>
              authStore.getToken({ email: email, password: password })
            }
          >
            Войти
          </Button>
          {/* не забыть заменить кнопку!! */}
          <button
            type="button"
            className={style.btn}
            onClick={passwordRecoveryModalHandler}
          >
            Забыли пароль?
          </button>
        </>
      )}
    </form>
  );
};

export default AuthModal;
