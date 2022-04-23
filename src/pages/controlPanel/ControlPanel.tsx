import React, { useContext, useEffect, useState } from "react";
import style from "./ControlPanel.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer/Footer";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import { Outlet } from "react-router-dom";
import { ErrorContext } from "../../components/store/ErrorContext";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";

const ControlPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const errorCtx = useContext(ErrorContext);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <div className={style.wrapper}>
      <Header type="control-panel" />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className={style.content}>
            <LeftMenu />
            <Outlet />
          </div>
          {errorCtx.isError && <FooterErrorMsg text={errorCtx.isErrorMsg} />}
          <Footer />
        </>
      )}
    </div>
  );
};
export default ControlPanel;
