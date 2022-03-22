import React from "react";
import styled from "styled-components";

interface IItem {
  index: number;
  curSlide: number;
}

const Item = styled.div<IItem>`
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
  index: number;
  curSlide: number;
}

const SliderItem: React.FC<ISliderItem> = (props) => {
  return (
    <Item index={props.index} curSlide={props.curSlide}>
      <Header>
        <UserInfo>
          <img src={require("../../assets/img/users/user-2.png")} alt="photo" />
          <p>{props.name}</p>
        </UserInfo>
        <p>08.01.2022</p>
      </Header>
      <Content>
        Отличный коллектив, руководители понимают сам процесс работы каждого
        сотрудника и помогают всем без исключения. Система KPI позволяет реально
        хорошо зарабатывать по простому принципу - чем больше и лучше ты
        работаешь, тем больше денег получаешь. Соцпакет - отличная страховка
        ДМС, организовали курсы английского языка бесплатно, оплачивают
        тренажерный зал. Зарплату выплачивают всегда вовремя.
      </Content>
    </Item>
  );
};
export default SliderItem;
