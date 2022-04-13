import React from "react";
import style from "./FooterPswRecovery.module.css";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Vk } from "../../../assets/icons/vk.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Insta } from "../../../assets/icons/insta.svg";
import { ReactComponent as FB } from "../../../assets/icons/FB.svg";
import { ReactComponent as Reddit } from "../../../assets/icons/reddit.svg";


const FooterPswRecovery: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.text}>
        © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
      </div>
      <div>
        <a
          className={`${style.iconA} ${style.noMobile}`}
          href="https://vk.com/feed"
          target="_blank"
        >
          <Vk />
        </a>
        <a
          className={`${style.iconA} ${style.iconAMobile}`}
          href="https://ria.ru/20220314/instagram-1777974202.html"
          target="_blank"
        >
          <Insta />
        </a>
        <a
          className={`${style.iconA} ${style.iconAMobile}`}
          href="https://www.forbes.ru/tekhnologii/458141-v-rossii-zablokirovali-facebook"
          target="_blank"
        >
          <FB />
        </a>
        <a
          className={`${style.iconA} ${style.iconAMobile}`}
          href="https://vc.ru/social/375177-roskomnadzor-zablokiroval-twitter-v-rossii/"
          target="_blank"
        >
          <Twitter />
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
export default FooterPswRecovery;
