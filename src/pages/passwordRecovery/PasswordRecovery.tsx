import React, { useState } from "react";
import style from "./PasswordRecovery.module.css";
import bg from "../../assets/img/bgAuth.svg";
import PasswordRecoveryModal from "../../components/modal/passwordRecoveryModal/PasswordRecoveryModal";
import GoodWindow from "../../components/UI/goodWindow/GoodWindow";
import BadWindow from "../../components/UI/badWindow/BadWindow";
import FooterPswRecovery from "../../components/footer/footerPswRecovery/FooterPswRecovery";
import Header from "../../components/header/Header";

const PasswordRecovery: React.FC = () => {
  const [isShowGoodWindow, setIsShowGoodWindow] = useState<boolean>(false);
  const [isShowBadWindow, setIsShowBadWindow] = useState<boolean>(false);

  return (
    <div className={style.wrapper}>
      <Header type="auth" />
      <div className={style.content}>
        <PasswordRecoveryModal
          showGoodWindow={setIsShowGoodWindow}
          showBadWindow={setIsShowBadWindow}
        />
        <img className={style.bgImg} src={bg} />
      </div>
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
      <FooterPswRecovery />
    </div>
  );
};
export default PasswordRecovery;
