import React from "react";
import style from "./AuthContent.module.css";
import AuthModal from "../modal/authModal/AuthModal";
import bg from "../../assets/img/bgAuth.svg";
import PasswordRecoveryModal from "../modal/passwordRecoveryModal/PasswordRecoveryModal";
import ChangePasswordModal from "../modal/changePasswordModal/ChangePasswordModal";

interface AuthContent {
  showFooterErrMsg: () => void;
  hideFooterErrMsg: () => void;
}


const AuthContent: React.FC<AuthContent> = (props) => {
  return (
    <div className={style.content}>
      <AuthModal showFooterErrMsg={props.showFooterErrMsg} hideFooterErrMsg={props.hideFooterErrMsg}/>
      {/* <PasswordRecoveryModal /> */}
      {/* <ChangePasswordModal /> */}
      <img className={style.bgImg} src={bg} />
    </div>
  );
};
export default AuthContent;
