import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AuthModal.module.css";
import Button from "../../UI/myButton/Button";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";
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

  const [password, setPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");

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
      props.setFooterErrMsg("Такого пользователя не существует");
      props.showFooterErrMsg(true);
    } else if (auth?.statusCode === 400) {
      props.setFooterErrMsg("Неправильный пароль!");
      props.showFooterErrMsg(true);
    } else if (auth.accessToken) {
      localStorage.setItem("auth", JSON.stringify(auth));
      props.showFooterErrMsg(false);
      navigate(`/hello-valiev/about-me`);
    } else if (auth?.statusCode) {
      props.setFooterErrMsg("Что то пошло не так! " + auth?.message);
      props.showFooterErrMsg(true);
    }
  }, [auth]);

  const emailValidationHandler = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
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
  };

  const passwordValidationHandler = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
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
  };

  const showPasswordHandler = (): void => {
    setIsVisiblePassword((prev) => !prev);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
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

  const passwordRecoveryModalHandler = (): void => {
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
            errorMsg={emailErrorMsg}
            isError={isEmailError}
          />
          <div className={style.formItem}>
            <label htmlFor="password">Пароль</label>
            <div className={style.inputWrapper}>
              <Input
                type="password"
                dataIsError={isPasswordError}
                data-is-unknown-user={props.isFooterErrMsg}
                dataHasData={!isPasswordError && password.trim().length > 0}
                id="password"
                placeholder="Введите пароль"
                inputType={isVisiblePassword ? "text" : "password"}
                onChange={passwordValidationHandler}
                isError={isPasswordError}
                errorMsg={passwordErrorMsg}
                value={password}
              />
              {isVisiblePassword ? (
                <CloseEyeIcon
                  data-is-error={isPasswordError}
                  className={style.icon}
                  onClick={showPasswordHandler}
                />
              ) : (
                <OpenEyeIcon
                  data-is-error={isPasswordError}
                  className={style.icon}
                  onClick={showPasswordHandler}
                />
              )}
            </div>
          </div>
          <Button
            onClick={() =>
              authStore.getToken({ email: email, password: password })
            }
            type="submit"
            style={style.enterBtn}
            isDisable={btnIsDisable}
          >
            Войти
          </Button>
          <Button type="authModalBtn" onClick={passwordRecoveryModalHandler}>
            Забыли пароль?
          </Button>
        </>
      )}
    </form>
  );
};

export default AuthModal;
