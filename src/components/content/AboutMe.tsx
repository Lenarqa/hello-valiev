import React from "react";
import styled from "styled-components";
import MyCard from "./MyCard";

const AboutMeSection = styled.div`
  display: flex;
`;

const AboutMe: React.FC = () => {
  return (
    <AboutMeSection>
      <div>
        <img src="" alt="photo" />
      </div>
      <div>
          <MyCard />
      </div>
    </AboutMeSection>
  );
};
export default AboutMe;
