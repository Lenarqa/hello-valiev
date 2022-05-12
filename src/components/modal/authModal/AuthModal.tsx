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
  passwordValidation,
  validateEmailReactHookForm,
} from "../../../shared/lib/validation/AuthValidation";
import { IValidationResult } from "../../../shared/models/models";

import { authStore } from "../../../shared/effector/auth";
import { useStore } from "effector-react";
import LoadingSpiner from "../../UI/loadingSpiner/LoadingSpiner";
import {useForm} from "react-hook-form";
import NewInput from "../../UI/input/NewInput";

interface IAuthModal {
  isFooterErrMsg: boolean;
  showFooterErrMsg: (value: boolean) => void;
  setFooterErrMsg: (value: string) => void;
}

type IAuth = {
  email:string;
  password: string;
}

const AuthModal: React.FC<IAuthModal> = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({mode:"all"});

  const [password, setPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");

  const [btnIsDisable, setBtnIsDisable] = useState<boolean>(false);// return to true

  const auth = useStore(authStore.$token);
  const isLoading = useStore(authStore.$isLoading);

  useEffect(() => {
    if (!errors.email && !isPasswordError) {
      setBtnIsDisable(false);
    }

    if (errors.email || password.trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [errors.email, isPasswordError, password]);

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
  
  const submitHandler = (data: any): void => {
    if (
      EmailValidationRegEx.test(data.email) &&
      passwordValidationRegEx.test(password)
    ) {
      authStore.getToken({ email: data.email, password: password });
    }
  };


  const passwordRecoveryModalHandler = (): void => {
    props.showFooterErrMsg(false);
    navigate(`/hello-valiev/passwordRecovery`);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(submitHandler)}>
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <h2>Войти</h2>
          <NewInput
            id="email"
            type="string"
            register={register("email", {validate:validateEmailReactHookForm})}
            placeholder="Введите логин"
            error={errors.email?.message}
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
