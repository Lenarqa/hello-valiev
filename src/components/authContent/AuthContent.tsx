import React from "react";
import style from "./AuthContent.module.css";
import AuthModal from "../modal/authModal/AuthModal";
import bg from "../../assets/img/bgAuth.svg";

interface AuthContent {
  isFooterErrMsg: boolean;
  showFooterErrMsg: (value: boolean) => void;
  setFooterErrMsg: (value: string) => void;
}

const AuthContent: React.FC<AuthContent> = (props) => {
  return (
    <div className={style.content}>
      <AuthModal
        isFooterErrMsg={props.isFooterErrMsg}
        showFooterErrMsg={props.showFooterErrMsg}
        setFooterErrMsg={props.setFooterErrMsg}
      />
      <img className={style.bgImg} src={bg} />
    </div>
  );
};
export default AuthContent;
