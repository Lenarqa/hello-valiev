import React, { useState } from "react";
import style from "./Content.module.css";
import bg from "../../assets/img/bg.svg";
import SliderSection from "../Slider/Slider";
import AboutMe from "./aboutMe/AboutMe";
import GoodWindow from "../UI/goodWindow/GoodWindow";
import BadWindow from "../UI/badWindow/BadWindow";

const Content: React.FC = () => {
  const [showGoodWindow, setShowGoodWindow] = useState<boolean>(false);
  const [showBadWindow, setShowBadWindow] = useState<boolean>(false);

  return (
    <div className={style.contentSection}>
      <img className={style.bgImg} src={bg} />
      <div className={style.contentWrapper}>
        <div className={style.title}>Добро пожаловать в академию!</div>
        <AboutMe />
      </div>
      <SliderSection setShowGoodWindow={setShowGoodWindow} />
      {showGoodWindow && (
        <GoodWindow
          title="Успешно!"
          text="Спасибо за отзыв о нашей компании :)"
          setShowGoodWindow={setShowGoodWindow}
        />
      )}
      {showBadWindow && (
        <BadWindow
          title="Что-то не так..."
          text="Не получилось отправить отзыв. Попробуйте еще раз!"
          setShowBadWindow={setShowBadWindow}
        />
      )}
    </div>
  );
};
export default Content;
