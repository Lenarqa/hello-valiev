import React from "react";
import styled from "styled-components";
import MyCard from "./MyCard";

const AboutMeSection = styled.div`
  display: flex;
  width: 100%;
`;

const Img = styled.img`
  height: 383px;
  min-width: 519px;
  margin-top: 30px;
  border-radius: 2px;
`;

const AboutMe: React.FC = () => {
  return (
    <AboutMeSection>
      <Img src={require("../../assets/img/photo.jpg")} alt="photo" />
      <MyCard />
    </AboutMeSection>
  );
};
export default AboutMe;
