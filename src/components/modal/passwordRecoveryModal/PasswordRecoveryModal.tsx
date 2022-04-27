import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./PasswordRecoveryModal.module.css";
import Button from "../../UI/myButton/Button";
import MsgWindow from "../../UI/myMsgWindow/MsgWindow";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/icons/arrowLeft.svg";
import { EmailValidationRegEx } from "../../../shared/lib/validation/regEx";
import { emailValidation } from "../../../shared/lib/validation/AuthValidation";
import { IValidationResult } from "../../../shared/models/models";

interface IPasswordRecoveryModal {
  showGoodWindow: (value: boolean) => void;
  showBadWindow: (value: boolean) => void;
}

const PasswordRecoveryModal: React.FC<IPasswordRecoveryModal> = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [isHoverEmail, setIsHoverEmail] = useState<boolean>(false);
  const [btnIsDisable, setBtnIsDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!isEmailError) {
      setBtnIsDisable(false);
    }

    if (email.trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [isEmailError, email]);

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmailErrorMsg("");
    setEmail(newValue);
    setIsEmailError(false);
    setBtnIsDisable(true);

    const res: IValidationResult = emailValidation(newValue);

    if (res.result) {
      setIsEmailError(true);
      setEmailErrorMsg(res.errorMsg);
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon и иконка исчезает
    // чтобы не оставалось окно с описанием ошибки без сообщения, выключаем ховер
    if (EmailValidationRegEx.test(newValue)) {
      setIsHoverEmail(false);
    }
  };

  const emailMouseOutHandler = () => {
    setIsHoverEmail(false);
  };

  const emailMouseOverHandler = () => {
    setIsHoverEmail(true);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (EmailValidationRegEx.test(email)) {
      if (email === "enter@gmail.com") {
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
    <form className={style.form} onSubmit={submitHandler}>
      <div className={style.formHeader} onClick={cancelHandler}>
        <ArrowLeftIcon className={style.arrow} />
        <h2>Сброс пароля</h2>
      </div>
      <div className={style.formItem}>
        <label htmlFor="login">Электронная почта</label>
        <div className={style.inputWrapper}>
          <input
            id="login"
            placeholder="Введите логин"
            onChange={emailValidationHandler}
            value={email}
            data-is-error={isEmailError}
            data-has-data={!isEmailError && email.trim().length > 0}
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
