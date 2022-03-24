import React from "react";
import styled from "styled-components";
import HeaderButton from "../UI/HeaderButton";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 80px;
  width: 100%;
  height: 116px;
  background-color: #fff;
  text-align: center;
`;

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h2`
    font-family: "Gilroy";
    color: #333;
    font-size: 18px;
    font-family: 'Gilroy-Bold', sans-serif;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    color: #585CC6;
    font-family: 'Gilroy-Bold', sans-serif;

    p:first-child {
        font-size: 32px;
        font-weight: 700;
        color: #585CC6;
    }
    p:last-child {
        text-transform: uppercase;
    } 
`

const Img = styled.img`
    height: 52px;
    width: 52px;
    border-radius: 2px;
    margin-right: 20px;
`

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <PhotoSection>
        <Img src={require("../../assets/img/photo.jpg")} alt="photo" />
        <Name>Ленар Валиев</Name>
      </PhotoSection>
      <Title>
          <p>ilink</p>
          <p>academy</p>
      </Title>
      <div>
        <HeaderButton onClick={()=>{alert("Панель управления")}}>Панель управления</HeaderButton>
      </div>
    </StyledHeader>
  );
};

export default Header;
