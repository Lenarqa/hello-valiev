import React from "react";
import styled from "styled-components";
import ButtonAdd from "../UI/ButtonAdd";
import SliderItem from "./SliderItem";

const StyledSliderSection = styled.div`
  width: 100%;
  margin-bottom: 106px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 56px;
`;

const Title = styled.h2`
  font-size: 68px;
  color:#333333;
  font-family: "Factor A";
`;

const Reviews = styled.div`
    background-color: #fff;
    padding: 74px 80px;
    width: 1198px;
`

const Slider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SliderSection: React.FC = () => {
  return (
    <StyledSliderSection>
      <Reviews>
        <Header>
          <Title>Отзывы</Title>
          <ButtonAdd>Добавить отзыв</ButtonAdd>
        </Header>
        <Slider>
            <SliderItem />
            <SliderItem />
        </Slider>
      </Reviews>
    </StyledSliderSection>
  );
};
export default SliderSection;
