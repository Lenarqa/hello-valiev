import React from "react";
import style from "./ControlPanel.module.css";
import Header from "../../components/header/header/Header";
import Footer from "../../components/footer/footer/Footer";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import { Outlet } from "react-router-dom";

const ControlPanel: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.content}>
        <LeftMenu />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default ControlPanel;
