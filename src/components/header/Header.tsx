import React from "react";
import { ReactComponent as ButtonMobile } from "../../assets/icons/button1.svg";
import style from "./Header.module.css";
import useWindowDimensions from "../../functions/ScreenSize";
import { ReactComponent as ILinkLogo } from "../../assets/img/logoAcademy.svg";
import { useNavigate } from "react-router-dom";
import { useStore } from "effector-react";
import { userStore } from "../../shared/effector/userInfo";
import Button from "../UI/myButton/Button";

interface IHeader {
  type: string;
}

const Header: React.FC<IHeader> = (props) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();
  const userInfo = useStore(userStore.$userInfo);

  const openControlPanelHandler = (): void => {
    navigate(`/hello-valiev/controlPanel/users`);
  };

  const openAboutMePage = (): void => {
    navigate(`/hello-valiev/about-me`);
  };

  return (
    <header className={style.header} data-type={props.type}>
      <div className={style.mobile}>
        <div className={style.photoSection}>
          <img
            className={style.img}
            src={`https://academtest.ilink.dev/images/${userInfo?.mainImgUrl}`}
            alt="photo"
          />
          <h2 className={style.name}>
            {width < 710
              ? `${userInfo?.name.split(" ")[0]}`
              : `${userInfo?.name}`}
          </h2>
          <h2 className={style.name}>{userInfo?.name}</h2>
        </div>
        <div className={style.controlPanelTitle}>Панель управления</div>
      </div>
      <ILinkLogo className={style.ilinkLogo} onClick={openAboutMePage} />
      <div className={style.actions}>
        {width < 710 ? (
          <ButtonMobile
            style={{ width: 32, height: 32 }}
            onClick={openControlPanelHandler}
          />
        ) : (
          <Button type="header" onClick={openControlPanelHandler}>
            Панель управления
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
