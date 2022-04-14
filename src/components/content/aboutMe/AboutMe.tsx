import React from "react";
import style from "./AboutMe.module.css";
import MyCard from "../myCard/MyCard";

const AboutMe: React.FC = () => {
  return (
    <div className={style.aboutMe}>
      <img className={style.img} src={require("../../../assets/img/Me_03.webp")} alt="photo" />
      <MyCard />
    </div>
  );
};
export default AboutMe;
