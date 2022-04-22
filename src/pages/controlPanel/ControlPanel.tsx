import React, { useContext, useState } from "react";
import style from "./ControlPanel.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer/Footer";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import { Outlet } from "react-router-dom";
import { ErrorContext } from "../../components/store/ErrorContext";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";

const ControlPanel: React.FC = () => {
  const errorCtx = useContext(ErrorContext);

  return (
    <div className={style.wrapper}>
      <Header type="control-panel" />
      <div className={style.content}>
        <LeftMenu />
        <Outlet />
      </div>
      {errorCtx.isError && <FooterErrorMsg text={errorCtx.isErrorMsg} />}
      <Footer />
    </div>
  );
};
export default ControlPanel;
