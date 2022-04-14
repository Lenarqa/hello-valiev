import React from "react";
import styled from "styled-components";
import HeaderButton from "../../UI/headerButton/HeaderButton";
import { ReactComponent as Button1 } from "../../../assets/icons/button1.svg";
import style from "./Header.module.css";
import useWindowDimensions from "../../../functions/ScreenSize";
import { ReactComponent as ILinkLogo } from "../../../assets/img/logoAcademy.svg";

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

  @media (max-width: 590px) {
    margin-bottom: 60px;
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
    <header className={style.header}>
      <div className={style.photoSection}>
        <img
          className={style.img}
          src={require("../../../assets/img/photo.jpg")}
          alt="photo"
        />
        <h2 className={style.name}>{width < 710 ? "Ленар" : "Ленар Валиев"}</h2>
      </div>
      <ILinkLogo />
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
    </header>
  );
};

export default Header;
