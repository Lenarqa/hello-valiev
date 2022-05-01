import React, { useEffect } from "react";
import style from "./AboutMe.module.css";
import { useStore } from "effector-react";
import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/footer/Footer";
import { authStore } from "../../shared/effector/auth";
import { userStore } from "../../shared/effector/userInfo";
import { userRevievsStore } from "../../shared/effector/reviews";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";

const AboutMe: React.FC = () => {
  const authToken = useStore(authStore.$token);
  const isLoadingUserInfo = useStore(userStore.$isLoading);
  
  const reviews = useStore(userRevievsStore.$userReviews);//для того чтобы отображать в будущем опубликованные отзывы в слайдере
  const isLoadingReviews = useStore(userRevievsStore.$isLoadingReviews);

  useEffect(() => {
    userStore.getUserInfo(authToken.accessToken);
    userRevievsStore.getUserReviews(authToken.accessToken);
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
