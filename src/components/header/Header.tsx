import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderButton from "../UI/HeaderButton";
import { ReactComponent as Button1 } from "../../assets/icons/button1.svg";

import useWindowDimensions from "../../functions/ScreenSize";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 80px;
  width: 100%;
  height: 116px;
  background-color: #fff;
  text-align: center;

  @media (max-width: 710px) {
    padding: 16px 21px;
  }

  @media (max-width: 321px) {
    margin-bottom: 43px;
  }
`;

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h2`
  font-family: "Gilroy";
  color: #333;
  font-size: 18px;
  font-family: "Gilroy-Bold", sans-serif;

  @media (max-width: 321px) {
    font-size: 12px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #585cc6;
  font-family: "Gilroy-Bold", sans-serif;

  p:first-child {
    font-size: 32px;
    font-weight: 700;
    color: #585cc6;
  }

  p:last-child {
    text-transform: uppercase;
  }

  @media (max-width: 321px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  height: 52px;
  width: 52px;
  border-radius: 2px;
  margin-right: 20px;

  @media (max-width: 321px) {
    margin-right: 8px;
  }
`;

const Header: React.FC = () => {
  const { height, width } = useWindowDimensions();

  return (
    <StyledHeader>
      <PhotoSection>
        <Img src={require("../../assets/img/photo.jpg")} alt="photo" />
        <Name>{width < 710 ? "Ленар" : "Ленар Валиев"}</Name>
      </PhotoSection>
      <Title>
        <p>ilink</p>
        <p>academy</p>
      </Title>
      <div>
        {width < 710 ? (
          <Button1
            style={{ width: 32, height: 32 }}
            onClick={() => {
              alert("Панель управления");
            }}
          />
        ) : (
          <HeaderButton
            onClick={() => {
              alert("Панель управления");
            }}
          >
            Панель управления
          </HeaderButton>
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
