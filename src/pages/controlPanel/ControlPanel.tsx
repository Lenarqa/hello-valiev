import React from "react";
import style from "./ControlPanel.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer/Footer";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import { Outlet } from "react-router-dom";

const ControlPanel: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Header type="control-panel"/>
      <div className={style.content}>
        <LeftMenu />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default ControlPanel;
