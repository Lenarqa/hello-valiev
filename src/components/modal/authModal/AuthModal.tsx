import React from "react";
import style from "./AuthModal.module.css";
import BlueButton from "../../UI/Button/Button";

const AuthModal: React.FC = () => {
  return (
    <form className={style.form}>
      <h2>Войти</h2>
      <div className={style.formItem}>
        <label>Логин</label>
        <input placeholder="Введите логин"/>
      </div>
      <div className={style.formItem}>
        <label>Пароль</label>
        <input placeholder="Введите пароль"/>
      </div>
      <BlueButton>Войти</BlueButton>
      <div className={style.text}>Забыли пароль?</div>
    </form>
  );
};
export default AuthModal;
