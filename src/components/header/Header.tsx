import React from "react";
import HeaderButton from "../UI/headerButton/HeaderButton";
import { ReactComponent as ButtonMobile } from "../../assets/icons/button1.svg";
import style from "./Header.module.css";
import useWindowDimensions from "../../functions/ScreenSize";
import { ReactComponent as ILinkLogo } from "../../assets/img/logoAcademy.svg";
import { useNavigate } from "react-router-dom";

interface IHeader {
  type: string;
}

const Header: React.FC<IHeader> = (props) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const openControlPanelHandler = (): void => {
    navigate(`/hello-valiev/controlPanel/users`);
  };

  const openAboutMePage = ():void => {
    navigate(`/hello-valiev/about-me`);
  }

  return (
    <header className={style.header} data-type={props.type}>
      <div className={style.photoSection}>
        <img
          className={style.img}
          src={require("../../assets/img/photo.jpg")}
          alt="photo"
        />
        <h2 className={style.name}>{width < 710 ? "Ленар" : "Ленар Валиев"}</h2>
      </div>
      <div className={style.controlPanelTitle}>Панель управления</div>
      <ILinkLogo className={style.ilinkLogo} onClick={openAboutMePage}/>
      <div className={style.actions}>
        {width < 710 ? (
          <ButtonMobile
            style={{ width: 32, height: 32 }}
            onClick={openControlPanelHandler}
          />
        ) : (
          <HeaderButton onClick={openControlPanelHandler}>
            Панель управления
          </HeaderButton>
        )}
      </div>
    </header>
  );
};

export default Header;
