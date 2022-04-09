import React from "react";
import style from "./AuthModal.module.css";
import styled from "styled-components";
import BlueButton from "../../UI/BlueButton/BlueButton";

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
