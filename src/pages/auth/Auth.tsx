import React from "react";
import style from "./Auth.module.css";
import Footer from "../../components/footer/Footer";
import HeaderAuth from "../../components/header/HeaderAuth";
import AuthContent from "../../components/authContent/AuthContent";

const Auth: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <HeaderAuth />
      <AuthContent />
      <Footer />
    </div>
  );
};
export default Auth;
