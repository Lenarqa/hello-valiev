import React, { useState } from "react";
import style from "./Auth.module.css";
import Footer from "../../components/footer/footer/Footer";
import AuthContent from "../../components/authContent/AuthContent";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";
import Header from "../../components/header/Header";

const Auth: React.FC = () => {
  const [isFooterErrMsg, setIsFooterErrMsg] = useState<boolean>(false);

  return (
    <div className={style.wrapper}>
      <Header type="auth" />
      <AuthContent
        isFooterErrMsg={isFooterErrMsg}
        showFooterErrMsg={setIsFooterErrMsg}
      />
      {isFooterErrMsg && (
        <FooterErrorMsg text="Такого пользователя не существует" />
      )}
      <Footer />
    </div>
  );
};
export default Auth;
