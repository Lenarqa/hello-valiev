import React from "react";
import AuthModal from "../modal/AuthModal";
import styled from "styled-components";
import bg from "../../assets/img/bgAuth.svg";

const ContentSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const BgImg = styled.img`
  position: absolute;
  left: 0px;
  top: 40px;
  width: 100%;
  z-index: -1;
`;

const AuthContent: React.FC = () => {
  return (
    <ContentSection>
      <AuthModal />
      <BgImg src={bg} />
    </ContentSection>
  );
};
export default AuthContent;
