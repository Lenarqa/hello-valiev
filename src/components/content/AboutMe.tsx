import React from "react";
import styled from "styled-components";
import MyCard from "./MyCard";

const AboutMeSection = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 120px;
`;

const Img = styled.img`
  height: 383px;
  max-width: 519px;
  margin-top: 30px;
  border-radius: 2px;
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
