import React from "react";
import style from "./HeaderAuth.module.css";
import { ReactComponent as ILinkLogo } from "../../../assets/img/iLink.svg";
import { ReactComponent as AcademyLogo } from "../../../assets/img/academy.svg";

const HeaderAuth: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.logoWrapper}>
        <ILinkLogo className={style.logo} />
        <AcademyLogo />
      </div>
    </header>
  );
};
export default HeaderAuth;
