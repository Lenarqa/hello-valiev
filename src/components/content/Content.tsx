import React from "react";
import styled from "styled-components";
import bg from "../../assets/img/bg.svg";
import SliderSection from "../Slider/Slider";
import AboutMe from "./AboutMe";

const ContentSection = styled.div`
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  padding: 93px 80px 106px 80px;
`;

const BgImg = styled.img`
  position: absolute;
  right: 0;
  z-index: -1;
`;

const Title = styled.div`
  width: 1157px;
  height: 296px;
  color: #fff;
  font-size: 124px;
  color: #fff;
  font-family: "Factor A";
  margin-bottom: 88px;
`;

const Content: React.FC = () => {
  return (
    <ContentSection>
      <BgImg src={bg} />
      <ContentWrapper>
        <Title>Добро пожаловать в академию!</Title>
        <AboutMe />
      </ContentWrapper>
      <SliderSection />
    </ContentSection>
  );
};
export default Content;
