import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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
  color: #333333;
  font-family: "Factor A";
`;

const Reviews = styled.div`
  background-color: #fff;
  width: 1198px;
  padding: 74px 80px 0px 80px;
`;

// Slider logic
const SlidesWrapper = styled.div`
  /* padding: 0 80px; */
  overflow: hidden;
  height: 344px;
  width: 102%;
  position: relative;
  transition: 1s ease;
`;

interface ISlider {
  slideNum: number;
  curSlide: number;
}

const Slides = styled.div<ISlider>`
  transition: 1s ease;
  width: ${({slideNum})=> `${(slideNum+1)*100}%`};
  height: 100%;
  display: flex;
  padding-bottom: 64px;
  margin-left: ${({ curSlide }) => `${curSlide * -543}px`};
`;
const Navigation = styled.div`
  position: absolute;
  width: 100px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

interface IInputProps {
  index: number;
}

const SliderSection: React.FC = () => {
  const [curSlide, setCurSlide] = useState(0);
  return (
    <StyledSliderSection>
      <Reviews>
        <Header>
          <Title>Отзывы</Title>
          <ButtonAdd>Добавить отзыв</ButtonAdd>
        </Header>

        <SlidesWrapper>
          <Slides slideNum={2} curSlide={curSlide}>
            <SliderItem name="slide 1" index={0} curSlide={curSlide} />
            <SliderItem name="slide 2" index={1} curSlide={curSlide} />
            <SliderItem name="slide 3" index={2} curSlide={curSlide} />
          </Slides>
          <Navigation>
            <button onClick={() => setCurSlide(0)}>1</button>
            <button onClick={() => setCurSlide(1)}>2</button>
            <button onClick={() => setCurSlide(2)}>3</button>
          </Navigation>
        </SlidesWrapper>
      </Reviews>
    </StyledSliderSection>
  );
};
export default SliderSection;
