import React, { useState } from "react";
import style from "./Auth.module.css";
import Footer from "../../components/footer/footer/Footer";
import AuthContent from "../../components/authContent/AuthContent";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";
import Header from "../../components/header/Header";

const Auth: React.FC = () => {
  const [isFooterErrMsg, setIsFooterErrMsg] = useState<boolean>(false);
  const [footerErrMsg, setFooterErrMsg] = useState<string>("")

  return (
    <div className={style.wrapper}>
      <Header type="auth" />
      <AuthContent
        isFooterErrMsg={isFooterErrMsg}
        showFooterErrMsg={setIsFooterErrMsg}
        setFooterErrMsg={setFooterErrMsg}
      />
      {isFooterErrMsg && (
        <FooterErrorMsg text={footerErrMsg} />
      )}
      <Footer />
    </div>
  );
};
export default Auth;
