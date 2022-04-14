import React from "react";
import style from "./Footer.module.css";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Vk } from "../../../assets/icons/vk.svg";
import { ReactComponent as Reddit } from "../../../assets/icons/reddit.svg";

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.text}>
        © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
      </div>
      <div>
        <a
          className={style.iconA}
          href="https://vk.com/lenarqaa"
          target="_blank"
        >
          <Vk />
        </a>
        <a
          className={style.iconA}
          href="https://www.reddit.com/"
          target="_blank"
        >
          <Reddit />
        </a>
        <a className={style.iconA} href="https://t.me/Lenarqa" target="_blank">
          <Telegram />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
