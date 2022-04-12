import React from "react";
import style from "./AuthContent.module.css";
import AuthModal from "../modal/authModal/AuthModal";
import bg from "../../assets/img/bgAuth.svg";
import PasswordRecoveryModal from "../modal/passwordRecoveryModal/PasswordRecoveryModal";

interface AuthContent {
  isFooterErrMsg: boolean;
  showFooterErrMsg: () => void;
  hideFooterErrMsg: () => void;
}

const AuthContent: React.FC<AuthContent> = (props) => {
  return (
    <div className={style.content}>
      {/* <AuthModal
        isFooterErrMsg={props.isFooterErrMsg}
        showFooterErrMsg={props.showFooterErrMsg}
        hideFooterErrMsg={props.hideFooterErrMsg}
      /> */}
      <PasswordRecoveryModal />
      <img className={style.bgImg} src={bg} />
    </div>
  );
};
export default AuthContent;
