import React from "react";
import styled from "styled-components";
import man from "../../assets/icons/man.svg";
import animal from "../../assets/icons/animal.svg";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 383px;
  padding: 40px;
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
  margin-right: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 18px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-right: 40px;
`;

const AboutMeInfo = styled.div`
    margin-bottom: 10px;
`

const AboutMeText = styled.div`
  font-family: "Gilroy", sans-serif;
  color: #333;
  font-size: 18px;
  line-height: 24px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
          <img src={man} />
        </InfoItem>
        <InfoItem>
          <Title>Возраст:</Title>
          <Text>23</Text>
        </InfoItem>
      </Info>
      <AboutMeInfo>
        <AboutMeText>
          <b>О себе:</b> Hello everybody! Меня зовут Ленар, мне 23 года, я
          студент ТУСУРа. Учусь на программиста-экономиста на 1 курсе
          магистратуры. За время бакалавариата, я успел попробовать себя во
          многих областях программирования и не только. Попробовал себя в роли
          бухгалтера, помошника метролога, инженера-программиста и т.д. И в
          итоге я пришел к frontend разработке, и хотя сначала я относился к
          этому скептически, попробовав, я понял, что да, это то в чем бы я
          хотел заниматься, разработка интерфейсов, логика пользовательского
          взаимодействие, движение данных внутри сайта и анимация, все это меня
          очень привлекло.
        </AboutMeText>
      </AboutMeInfo>
      <div>
        <Footer>
          <img src={animal} style={{marginRight: 12}}/>
          <AboutMeText>
            <b>Домашних животных:</b> нет
          </AboutMeText>
        </Footer>
      </div>
    </Card>
  );
};
export default MyCard;
