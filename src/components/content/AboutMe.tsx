import React from "react";
import styled from "styled-components";
import MyCard from "./MyCard";

const AboutMeSection = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 120px;

  @media (max-width: 1116px) {
    flex-direction: column;
    align-items: flex-end;
  }

  @media (max-width: 321px) {
    align-items: flex-start;
    margin-bottom: 57px;
  }
`;

const Img = styled.img`
  height: auto;
  max-width: 519px;
  margin-top: 30px;
  border-radius: 2px;

  @media (max-width: 1116px) {
    flex-direction: column;
  }

  @media (max-width: 321px) {
    width: 304px;
    height: auto;
  }
`;

const AboutMe: React.FC = () => {
  return (
    <AboutMeSection>
      <Img src={require("../../assets/img/Me_03.webp")} alt="photo" />
      <MyCard />
    </AboutMeSection>
  );
};
export default AboutMe;
