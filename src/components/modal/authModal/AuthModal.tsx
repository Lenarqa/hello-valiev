import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AuthModal.module.css";
import Button from "../../UI/myButton/Button";
import { ReactComponent as OpenEyeIcon } from "../../../assets/icons/openEye.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/icons/closeEye.svg";
import {
  EmailValidationRegEx,
  passwordValidationRegEx,
} from "../../../shared/lib/validation/regEx";
import {
  validateEmailReactHookForm,
  validatePasswordReactHookForm,
} from "../../../shared/lib/validation/AuthValidation";

import { authStore } from "../../../shared/effector/auth";
import { useStore } from "effector-react";
import LoadingSpiner from "../../UI/loadingSpiner/LoadingSpiner";
import { useForm } from "react-hook-form";
import MyInput from "../../UI/input/MyInput";
import { IAuth } from "../../../shared/models/models";

interface IAuthModal {
  isFooterErrMsg: boolean;
  showFooterErrMsg: (value: boolean) => void;
  setFooterErrMsg: (value: string) => void;
}

const AuthModal: React.FC<IAuthModal> = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IAuth>({ mode: "all" });

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const auth = useStore(authStore.$token);
  const isLoading = useStore(authStore.$isLoading);
  
  const authError = useStore(authStore.$authError);
  console.log(authError);

  useEffect(() => {
    if (authError) {
      props.setFooterErrMsg(authError);
      props.showFooterErrMsg(true);
      authStore.clearError('');
    } else if (auth.accessToken) {
      localStorage.setItem("auth", JSON.stringify(auth));
      props.showFooterErrMsg(false);
      navigate(`/hello-valiev/about-me`);
    }
  }, [authError, auth]);
  

  const showPasswordHandler = (): void => {
    setIsVisiblePassword((prev) => !prev);
  };

  const submitHandler = (data: any): void => {
    if (
      EmailValidationRegEx.test(data.email) &&
      passwordValidationRegEx.test(data.password)
    ) {
      authStore.getToken({ email: data.email, password: data.password });
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
          <MyInput
            id="email"
            type="string"
            register={register("email", {
              validate: validateEmailReactHookForm,
            })}
            placeholder="Введите логин"
            error={errors.email?.message}
          />
          <div className={style.formItem}>
            <label htmlFor="password">Пароль</label>
            <div className={style.inputWrapper}>
              <MyInput
                type="password"
                id="password"
                placeholder="Введите пароль"
                inputType={isVisiblePassword ? "text" : "password"}
                register={register("password", {
                  validate: validatePasswordReactHookForm,
                })}
                error={errors.password?.message}
              />
              {isVisiblePassword ? (
                <CloseEyeIcon
                  data-is-error={!errors.password}
                  className={style.icon}
                  onClick={showPasswordHandler}
                />
              ) : (
                <OpenEyeIcon
                  data-is-error={!errors.password}
                  className={style.icon}
                  onClick={showPasswordHandler}
                />
              )}
            </div>
          </div>
          <Button type="submit" style={style.enterBtn} isDisable={!isDirty || !isValid}>
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
