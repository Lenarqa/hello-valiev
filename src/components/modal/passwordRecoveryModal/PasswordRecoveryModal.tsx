import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./PasswordRecoveryModal.module.css";
import Button from "../../UI/myButton/Button";
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
  const [btnIsDisable, setBtnIsDisable] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IPasswordRecovery>({ mode: "all" });

  useEffect(() => {
    if (!errors.email) {
      setBtnIsDisable(false);
    }

    if (getValues("email").trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [errors.email]);

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
        <Button type="submit" isDisable={btnIsDisable}>
          Отправить код
        </Button>
        <Button type="button" onClick={cancelHandler}>
          Отмена
        </Button>
      </div>
      <button className={style.mobileBtn} type="submit" disabled={btnIsDisable}>
        Cбросить
      </button>
    </form>
  );
};

export default PasswordRecoveryModal;
