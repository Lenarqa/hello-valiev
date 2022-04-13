import React, { useState } from "react";
import style from "./Auth.module.css";
import Footer from "../../components/footer/Footer";
import HeaderAuth from "../../components/header/HeaderAuth";
import AuthContent from "../../components/authContent/AuthContent";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";
import GoodWindow from "../../components/UI/GoodWindow";
import BadWindow from "../../components/UI/BadWindow";

const Auth: React.FC = () => {
  const [isFooterErrMsg, setIsFooterErrMsg] = useState<boolean>(false);
  const [isShowGoodWindow, setIsShowGoodWindow] = useState<boolean>(false);
  const [isShowBadWindow, setIsShowBadWindow] = useState<boolean>(true);

  const showFooterErrMsgHandler = () => {
    setIsFooterErrMsg(true);
  };

  const hideFooterErrMsgHandler = () => {
    setIsFooterErrMsg(false);
  };

  return (
    <div className={style.wrapper}>
      <HeaderAuth />
      <AuthContent
        isFooterErrMsg={isFooterErrMsg}
        showFooterErrMsg={showFooterErrMsgHandler}
        hideFooterErrMsg={hideFooterErrMsgHandler}
      />
      {isFooterErrMsg && (
        <FooterErrorMsg text="Такого пользователя не существует" />
      )}
      {isShowGoodWindow && (
        <GoodWindow
          title="Код отправлен"
          text="Код успешно отправлен на вашу почту!"
          setShowGoodWindow={setIsShowGoodWindow}
        />
      )}
      {isShowBadWindow && (
        <BadWindow
          title="Что-то не так..."
          text="Не получилось отправить код. Попробуйте еще раз!"
          setShowBadWindow={setIsShowBadWindow}
        />
      )}
      <Footer />
    </div>
  );
};
export default Auth;
