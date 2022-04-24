import React from "react";
import style from "./ControlPanelMenu.module.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserDisableIcon } from "../../assets/icons/userDisable.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat.svg";
import { ReactComponent as PaperIcon } from "../../assets/icons/paper.svg";

const ControlPanelMenu: React.FC = () => {
  return <div className={style.container}>
      <NavLink to={"users"} className={({isActive})=> isActive ? style.activeMenuItem : style.menuItem}>
          <UserDisableIcon />
          <p>Участники</p>
      </NavLink>
      <NavLink to={"reviews"} className={({isActive})=> isActive ? style.activeMenuItem : style.menuItem}>
          <ChatIcon />
          <p>Отзывы</p>
      </NavLink>
      <NavLink to={"aboutMe"} className={({isActive})=> isActive ? style.activeMenuItem : style.menuItem}>
          <PaperIcon />
          <p>Обо мне</p>
      </NavLink>
  </div>;
};
export default ControlPanelMenu;
