import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./PasswordRecoveryModal.module.css";
import Button from "../../UI/button/Button";
import MsgWindow from "../../UI/msgWindow/MsgWindow";
import { ReactComponent as InfoIcon } from "../../../assets/icons/infoSquare.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/icons/arrowLeft.svg";

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
  const emailValidation =
    /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;

  useEffect(() => {
    if (!isEmailError) {
      setBtnIsDisable(false);
    }

    if (email.trim().length === 0) {
      setBtnIsDisable(true);
    }
  }, [isEmailError, email]);

  // helper function
  const setErrorEmail = (errorMsg: string) => {
    setIsEmailError(true);
    setEmailErrorMsg(errorMsg);
  };

  const emailValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmailErrorMsg("");
    setEmail(newValue);
    setIsEmailError(false);
    setBtnIsDisable(true);

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
      setErrorEmail(
        "Email обязательно должен содержать домен (.ru/com и т.д). Домен не может быть короче 2 символов и длиннее 4"
      );
      return;
    }

    //final check, check
    if (!emailValidation.test(newValue)) {
      setErrorEmail(
        "Email не может включать в себе кирилицу или другие алфавиты, используйте только латиницу"
      );
      return;
    }

    // когда пользователь оставляет мышку поверх infoIcon и иконка исчезает
    // чтобы не оставалось окно с описанием ошибки без сообщения, выключаем ховер
    if (emailValidation.test(newValue)) {
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
    if (emailValidation.test(email)) {
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
  }

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
