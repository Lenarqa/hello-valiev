import React, { useEffect } from "react";
import { useStore } from "effector-react";
import style from "./AboutMe.module.css";
import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/footer/Footer";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";
import { userStore } from "../../shared/effector/userInfo";
import { userReviewsStore } from "../../shared/effector/reviews";
import { IMyInfo } from "../../shared/models/models";

const AboutMe: React.FC = () => {
  const userInfo = useStore(userStore.$userInfo);
  const isLoadingUserInfo = useStore(userStore.$isLoading);
  const isLoadingReviews = useStore(userReviewsStore.$isLoadingReviews);

  useEffect(() => {
    // тут временная провека пока не реализован запрос на редактирование профиля, 
    // сейчас я изменяю в панели управления userInfo, через ивент и чтобы при возвращении с панели управления на
    // главную не производился запрос который перетрет измененный стейт я проверяю есть ли что то в userInfo
    if(userInfo?.id) {
      return;
    }else {
      userStore.getUserInfo({} as IMyInfo);
    }
    userReviewsStore.getUserReviews([]);
  }, []);

  return (
    <>
      {isLoadingUserInfo && isLoadingReviews ? (
        <div className={style.spinerWrapper}>
          <LoadingSpiner />
        </div>
      ) : (
        <>
          <Header type="aboutMe" />
          <Content />
          <Footer />
        </>
      )}
    </>
  );
};
export default AboutMe;
