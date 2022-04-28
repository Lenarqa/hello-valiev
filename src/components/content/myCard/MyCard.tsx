import React from "react";
import style from "./MyCard.module.css";
import man from "../../../assets/icons/man.svg";
import animal from "../../../assets/icons/animal.svg";
import { useStore } from "effector-react";
import { userStore } from "../../../shared/effector/userInfo";
import { DummyOptionsGender } from "../../../shared/data/OptionsGender";
import { DummyOptionsCity } from "../../../shared/data/OptionsCity";
import { DummyOptionsPet } from "../../../shared/data/OptionsPet";

const MyCard: React.FC = () => {
  const userInfo = useStore(userStore.$userInfo);
  const userCity = DummyOptionsCity.find(item => item.id === userInfo?.city);
  const userGender = DummyOptionsGender.find(item => item.id === userInfo?.gender);
  const userPet = DummyOptionsPet.find(item => item.id === userInfo?.pet);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <p>{userInfo?.name}</p>
        <p>{userInfo?.birthday}</p>
      </div>
      <div className={style.info}>
        <div className={style.infoItem}>
          <p className={style.title}>Город:</p>
          <p className={style.text}>{userCity?.value}</p>
        </div>
        <div className={style.infoItem}>
          <p className={style.title}>Пол:</p>
          <p className={style.text}>{userGender?.value}</p>
          <img src={man} />
        </div>
        <div className={style.infoItem}>
          <p className={style.title}>Возраст:</p>
          <p className={style.text}>{userInfo?.year}</p>
        </div>
      </div>
      <div className={style.aboutMeInfo}>
        <div className={style.aboutMeText}>
          <b>О себе:</b> {userInfo?.aboutMeText}
        </div>
      </div>
      <div>
        <div className={style.footer}>
          <img src={animal} style={{ marginRight: 12 }} />
          <div className={style.aboutMeText}>
            <b>Домашних животных:</b> {userPet?.value}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyCard;
