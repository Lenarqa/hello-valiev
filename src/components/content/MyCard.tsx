import React from "react";
import styled from "styled-components";
import man from "../../assets/icons/man.svg";
import animal from "../../assets/icons/animal.svg";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  margin-top: -20px;
  padding: 40px;
  border-radius: 2px;
  height: fit-content;

  @media (max-width: 321px) {
    margin-top: -16px;
    padding: 16px;
  }
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
    font-family: "Gilroy";
    font-weight: 400;
    font-size: 18px;
  }

  @media (max-width: 676px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 321px) {
    align-items: flex-start;

    p:first-child {
      font-size: 24px;
      margin-bottom: 4px;
    }

    p:last-child {
      font-size: 16px;
    }
  }
`;

const Title = styled.p`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #333333;
  margin-right: 4px;

  @media (max-width: 321px) {
    font-size: 16px;
  }
`;

const Text = styled.p`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  margin-right: 10px;

  @media (max-width: 321px) {
    font-size: 16px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 18px;

  @media (max-width: 676px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 321px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 16px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  margin-right: 40px;

  @media (max-width: 676px) {
    margin: 10px 0;
  }

  @media (max-width: 321px) {
    margin-top: 0;
    margin-bottom: 12px;
  }
`;

const AboutMeInfo = styled.div`
  margin-bottom: 10px;
`;

const AboutMeText = styled.div`
  font-family: "Gilroy";
  color: #333;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;

  @media (max-width: 321px) {
    font-size: 16px;
    line-height: 22px;
  }
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
          <img src={animal} style={{ marginRight: 12 }} />
          <AboutMeText>
            <b>Домашних животных:</b> нет
          </AboutMeText>
        </Footer>
      </div>
    </Card>
  );
};
export default MyCard;
