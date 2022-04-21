import React from "react";
import style from "./MyCard.module.css";
import man from "../../../assets/icons/man.svg";
import animal from "../../../assets/icons/animal.svg";
import { MyInfo } from "../../../shared/data/MyInfo";

const MyCard: React.FC = () => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <p>{MyInfo.name}</p>
        <p>{MyInfo.birthday}</p>
      </div>
      <div className={style.info}>
        <div className={style.infoItem}>
          <p className={style.title}>Город:</p>
          <p className={style.text}>{MyInfo.city}</p>
        </div>
        <div className={style.infoItem}>
          <p className={style.title}>Пол:</p>
          <p className={style.text}>{MyInfo.gender}</p>
          <img src={man} />
        </div>
        <div className={style.infoItem}>
          <p className={style.title}>Возраст:</p>
          <p className={style.text}>{MyInfo.year}</p>
        </div>
      </div>
      <div className={style.aboutMeInfo}>
        <div className={style.aboutMeText}>
          <b>О себе:</b> {MyInfo.aboutMeText}
        </div>
      </div>
      <div>
        <div className={style.footer}>
          <img src={animal} style={{ marginRight: 12 }} />
          <div className={style.aboutMeText}>
            <b>Домашних животных:</b> {MyInfo.pet}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyCard;
