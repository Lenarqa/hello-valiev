import React from "react";
import styled from "styled-components";

const Item = styled.div`
  width: 519px;
  height: 279px;
  padding: 24px;
  border-radius: 2px;
  background-color: #f5f5f5;
  margin-right: 24px;

  @media (max-width: 590px) {
    height: auto;
    padding: 16px 12px;
  }

  @media (max-width: 321px) {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 16px 12px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  p {
    font-family: "Factor A";
    font-size: 14px;
    color: #8a8a8a;
    font-weight: 400;
  }

  @media (max-width: 321px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 4px;
  }
`;

const Content = styled.div`
  font-family: "Gilroy";
  font-size: 14px;
  color: #333333;
  line-height: 22px;

  @media (max-width: 321px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    height: 52px;
    width: 52px;
    border-radius: 2px;
    margin-right: 20px;
  }

  p {
    color: #333333;
    font-family: "Factor A";
    font-size: 24px;
  }

  @media (max-width: 321px) {
    margin-bottom: 12px;
    img {
      margin-right: 8px;
    }

    p {
      font-size: 16px;
    }
  }
`;

interface ISliderItem {
  name: string;
  imgUrl: string;
  date: string;
  text: string;
}

const SliderItem: React.FC<ISliderItem> = ({ name, imgUrl, date, text }) => {
  if (imgUrl.trim().length === 0) {
    imgUrl = "User-0.png";
  }

  return (
    <Item>
      <Header>
        <UserInfo>
          <img src={require(`../../assets/img/users/${imgUrl}`)} alt="photo" />
          <p>{name}</p>
        </UserInfo>
        <p>{date}</p>
      </Header>
      <Content>{text}</Content>
    </Item>
  );
};
export default SliderItem;
