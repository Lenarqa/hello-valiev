import React, { useEffect } from "react";
import { useStore } from "effector-react";
import Header from "../../components/header/Header";
import Content from "../../components/content/Content";
import Footer from "../../components/footer/footer/Footer";
import { authStore } from "../../shared/effector/auth";


const AboutMe: React.FC = () => {
  const authToken = useStore(authStore.$token)
  
  useEffect(()=>{
    console.log(authToken.accessToken)
    authStore.getUserInfo(authToken.accessToken)
  },[]);
  
  return (
    <>
      <Header type="aboutMe"/>
      <Content />
      <Footer />
    </>
  );
};
export default AboutMe;
