import React from "react";
import style from "./AuthContent.module.css";
import AuthModal from "../modal/authModal/AuthModal";
import bg from "../../assets/img/bgAuth.svg";
import PasswordRecoveryModal from "../modal/passwordRecoveryModal/PasswordRecoveryModal";
import ChangePasswordModal from "../modal/changePasswordModal/ChangePasswordModal";


const AuthContent: React.FC = () => {
  return (
    <div className={style.content}>
      <AuthModal />
      {/* <PasswordRecoveryModal /> */}
      {/* <ChangePasswordModal /> */}
      <img className={style.bgImg} src={bg} />
    </div>
  );
};
export default AuthContent;