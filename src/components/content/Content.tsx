import React, { useState } from "react";
import style from "./Content.module.css";
import bg from "../../assets/img/bg.svg";
import SliderSection from "../Slider/Slider";
import AboutMe from "./aboutMe/AboutMe";
import GoodWindow from "../UI/goodWindow/GoodWindow";
import BadWindow from "../UI/badWindow/BadWindow";
import { ITostData } from "../../shared/models/models";

const Content: React.FC = () => {
  const [tostData, setTostData] = useState<ITostData>({
    title: "Что-то не так...",
    msg: "Не получилось отправить отзыв. Попробуйте еще раз!",
  } as ITostData);
  const [showGoodWindow, setShowGoodWindow] = useState<boolean>(false);
  const [showBadWindow, setShowBadWindow] = useState<boolean>(false);

  return (
    <div className={style.contentSection}>
      <img className={style.bgImg} src={bg} />
      <div className={style.contentWrapper}>
        <div className={style.title}>Добро пожаловать в академию!</div>
        <AboutMe />
      </div>
      <SliderSection
        setShowGoodWindow={setShowGoodWindow}
        setShowBadWindow={setShowBadWindow}
        setTostData={setTostData}
      />
      {showGoodWindow && (
        <GoodWindow
          title="Успешно!"
          text="Спасибо за отзыв о нашей компании :)"
          setShowGoodWindow={setShowGoodWindow}
        />
      )}
      {showBadWindow && (
        <BadWindow
          title={tostData.title}
          text={tostData.msg}
          setShowBadWindow={setShowBadWindow}
        />
      )}
    </div>
  );
};
export default Content;
