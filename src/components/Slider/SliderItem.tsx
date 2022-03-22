import React from "react";
import styled from "styled-components";
import ButtonAdd from "../UI/ButtonAdd";

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

  p {
  }
`;

const SliderItem: React.FC = () => {
  return (
    <Item>
      <Header>
        <UserInfo>
          <img src={require("../../assets/img/users/user-2.png")} alt="photo" />
          <p>Name</p>
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
