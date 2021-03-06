import React, { useEffect } from "react";
import { useStore } from "effector-react";
import style from "./AboutMe.module.css";
import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/footer/Footer";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";
import { userStore } from "../../shared/effector/userInfo";
import { userReviewsStore } from "../../entities/review/model/index";

const AboutMe: React.FC = () => {
  useEffect(()=>{
    userStore.getUserInfo();
    userReviewsStore.getUserReviews([]);
  }, [])

  const isLoadingUserInfo = useStore(userStore.$isLoading);
  const isLoadingReviews = useStore(userReviewsStore.$isLoadingReviews);

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
