import React from "react";
import style from "./AboutMe.module.css";
import MyCard from "../myCard/MyCard";
import { useStore } from "effector-react";
import { userStore } from "../../../shared/effector/userInfo";

const AboutMe: React.FC = () => {
  const userInfo = useStore(userStore.$userInfo);

  return (
    <div className={style.aboutMe}>
      <img className={style.img} src={`https://academtest.ilink.dev/images/${userInfo?.mainImgUrl}`} alt="photo" />
      <MyCard />
    </div>
  );
};
export default AboutMe;
