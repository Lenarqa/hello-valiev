import React, { useContext, useEffect, useState } from "react";
import style from "./ControlPanel.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer/Footer";
import ControlPanelMenu from "../../components/controlPanelMenu/ControlPanelMenu";
import { Outlet } from "react-router-dom";
import { PopUpContext } from "../../components/store/PopUpContext";
import FooterErrorMsg from "../../components/UI/footerErrorMsg/FooterErrorMsg";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";
import GoodWindow from "../../components/UI/goodWindow/GoodWindow";
import BadWindow from "../../components/UI/badWindow/BadWindow";
import { usersStore } from "../../entities/userTable/model";
import { useStore } from "effector-react";

const ControlPanel: React.FC = () => {
  const isLoading: boolean = useStore(usersStore.$isLoadingFilteredUsers);
  const popUpContext = useContext(PopUpContext);

  return (
    <div className={style.wrapper}>
      <Header type="control-panel" />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className={style.content}>
            <ControlPanelMenu />
            <Outlet />
          </div>
          {popUpContext.isError && (
            <FooterErrorMsg text={popUpContext.isErrorMsg} />
          )}
          {popUpContext.isOpenGoodWindow && (
            <GoodWindow
              title="Сохранено"
              text="Данные успешно отредактированы!"
              setShowGoodWindow={popUpContext.setIsOpenGoodWindow}
            />
          )}
          {popUpContext.isOpenBadWindow && (
            <BadWindow
              title="Что-то не так..."
              text="Не получилось отредактировать данные. Попробуйте еще раз!"
              setShowBadWindow={popUpContext.setIsOpenBadWindow}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};
export default ControlPanel;
