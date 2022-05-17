import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./PasswordRecoveryModal.module.css";
import { Button } from "../../../shared/ui/button";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/icons/arrowLeft.svg";
import { EmailValidationRegEx } from "../../../shared/lib/validation/regEx";
import {
  validateEmailReactHookForm,
} from "../../../shared/lib/validation/AuthValidation";
import { IPasswordRecovery } from "../../../shared/models/models";
import { useForm } from "react-hook-form";
import MyInput from "../../UI/input/MyInput";

interface IPasswordRecoveryModal {
  showGoodWindow: (value: boolean) => void;
  showBadWindow: (value: boolean) => void;
}

const PasswordRecoveryModal: React.FC<IPasswordRecoveryModal> = (props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IPasswordRecovery>({ mode: "all" });

  const submitHandler = (data:any) => {
    props.showGoodWindow(false);
    props.showBadWindow(false);

    if (EmailValidationRegEx.test(data.email)) {
      if (data.email === "enter@gmail.com") {
        setTimeout(() => {
          props.showGoodWindow(true);
        }, 2000);
      } else {
        setTimeout(() => {
          props.showBadWindow(true);
        }, 2000);
      }
    }
  };

  const cancelHandler = () => {
    navigate(`/*`);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={style.formHeader} onClick={cancelHandler}>
        <ArrowLeftIcon className={style.arrow} />
        <h2>Сброс пароля</h2>
      </div>
      <div className={style.formItem}>
        <label htmlFor="login">Электронная почта</label>
        <div className={style.inputWrapper}>
          <MyInput
            id="email"
            type="string"
            style="password-recovery"
            register={register("email", {
              validate: validateEmailReactHookForm,
            })}
            placeholder="Введите логин"
            error={errors.email?.message}
          />
        </div>
      </div>
      <div className={style.actions}>
        <Button type="submit" isDisable={!isDirty || !isValid}>
          Отправить код
        </Button>
        <Button type="button" onClick={cancelHandler}>
          Отмена
        </Button>
      </div>
      <button className={style.mobileBtn} type="submit" disabled={!isDirty || !isValid}>
        Cбросить
      </button>
    </form>
  );
};

export default PasswordRecoveryModal;
