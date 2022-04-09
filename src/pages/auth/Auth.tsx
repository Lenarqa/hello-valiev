import React from "react";
import Footer from "../../components/footer/Footer";
import HeaderAuth from "../../components/header/HeaderAuth";
import AuthContent from "../../components/authContent/AuthContent";

const Auth: React.FC = () => {
  return (
    <>
      <HeaderAuth />
      <AuthContent />
      <Footer />
    </>
  );
};
export default Auth;
