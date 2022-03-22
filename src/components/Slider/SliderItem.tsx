import React from "react";
import styled from "styled-components";

const Item = styled.div`
  width: 519px;
  height: 279px;
  padding: 24px;
  border-radius: 2px;
  background-color: #f5f5f5;
  margin-right: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Content = styled.div`
  font-family: "Gilroy", sans-serif;
  font-size: 14px;
  color: #333333;
  line-height: 22px;
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
