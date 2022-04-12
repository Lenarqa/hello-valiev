import React from "react";
import style from "./PasswordRecoveryModal.module.css";
import Button from "../../UI/Button/Button";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/icons/arrowLeft.svg";

interface IPasswordRecoveryModal {
  hidePswdRecoveryModal: () => void;
}

const PasswordRecoveryModal: React.FC<IPasswordRecoveryModal> = (props) => {
  return (
    <form className={style.form}>
      <div className={style.formHeader} onClick={props.hidePswdRecoveryModal}>
        <ArrowLeftIcon className={style.arrow}/>
        <h2>Сброс пароля</h2>
      </div>
      <div className={style.formItem}>
        <label htmlFor="">Электронная почта</label>
        <input type="text" placeholder="Введите электронную почту" />
      </div>
      <div className={style.actions}>
        <Button type="button" onClick={() => console.log("Send cod!")}>
          Отправить код
        </Button>
        <Button type="button" onClick={props.hidePswdRecoveryModal}>
          Отмена
        </Button>
      </div>
    </form>
  );
};

export default PasswordRecoveryModal;
