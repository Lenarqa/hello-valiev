import React from "react";
import style from "./PasswordRecoveryModal.module.css";
import BlueButton from "../../UI/Button/Button";

const PasswordRecoveryModal: React.FC = () => {
  return (
    <form className={style.form}>
      <div>
        <h2>Сброс пароля</h2>
      </div>
      <div className={style.formItem}>
        <label htmlFor="">Электронная почта</label>
        <input type="text" placeholder="Введите электронную почту" />
      </div>
      <div className={style.actions}>
        <BlueButton>Отправить код</BlueButton>
        <BlueButton>Отмена</BlueButton>
      </div>
    </form>
  );
};

export default PasswordRecoveryModal;
