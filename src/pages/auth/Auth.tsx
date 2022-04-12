import React, { useState } from "react";
import style from "./Auth.module.css";
import Footer from "../../components/footer/Footer";
import HeaderAuth from "../../components/header/HeaderAuth";
import AuthContent from "../../components/authContent/AuthContent";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";

const Auth: React.FC = () => {
  const [isFooterErrMsg, setIsFooterErrMsg] = useState<boolean>(false);

  const toggleFooterErrMsgHandler = () => {
    setIsFooterErrMsg(prev=>!prev);
  }

  return (
    <div className={style.wrapper}>
      <HeaderAuth />
      <AuthContent toggleFooterErrMsg={toggleFooterErrMsgHandler}/>
      {isFooterErrMsg && <FooterErrorMsg text="Такого пользователя не существует" />}
      <Footer />
    </div>
  );
};
export default Auth;
