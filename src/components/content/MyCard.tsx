import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 383px;
  padding: 40px 40px 44px 40px;
  border-radius: 2px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  p:first-child {
    font-family: "Factor A";
    font-weight: 700;
    font-size: 32px;
    color: #585cc6;
  }

  p:last-child {
    color: #8a8a8a;
    font-family: "Gilroy", sans-serif;
    font-weight: 400;
    font-size: 18px;
  }
`;

const Title = styled.p`
  font-family: "Gilroy", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #333333;
  margin-right: 4px;
`;

const Text = styled.p`
  font-family: "Gilroy-Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const InfoItem = styled.div`
  display: flex;
`;

const MyCard: React.FC = () => {
  return (
    <Card>
      <Header>
        <p>Ленар Валиев</p>
        <p>25.11.1998</p>
      </Header>
      <Info>
        <InfoItem>
          <Title>Город:</Title>
          <Text>Томск</Text>
        </InfoItem>
        <InfoItem>
          <Title>Пол:</Title>
          <Text>Мужской</Text>
        </InfoItem>
        <InfoItem>
          <Title>Возраст:</Title>
          <Text>23</Text>
        </InfoItem>
      </Info>
      <div>
        <Title>О себе</Title>
        <p>
          О себе: Всем привет! Меня зовут Яна, мне 22 года, я студент. Учусь на
          программиста, но хочу стать продуктовым аналитиком. Недавно, например,
          я начала проходить курс на известной платформе, который поможет мне
          устроиться на работу моей мечты! BTW: И да, у меня есть милая кошка
          :)
        </p>
      </div>
      <div>
        <p>Домашнее животное: нету</p>
      </div>
    </Card>
  );
};
export default MyCard;
