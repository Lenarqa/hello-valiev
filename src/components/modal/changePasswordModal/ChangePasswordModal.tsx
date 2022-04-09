import React from "react";
import style from "./ChangePasswordModal.module.css";
import Button from "../../UI/Button/Button";


const ChangePasswordModal: React.FC = () => {
  return (
    <form className={style.form}>
      <div>
        <h2>Изменение пароля</h2>
      </div>
      <div className={style.formItem}>
        <label htmlFor="">Электронная почта</label>
        <input type="text" placeholder="Введите электронную почту" />
      </div>
      <div className={style.actions}>
        <Button>Отправить код</Button>
        <Button>Отмена</Button>
      </div>
    </form>
  );
};

export default ChangePasswordModal;
