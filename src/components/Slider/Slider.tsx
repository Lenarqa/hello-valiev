import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonAdd from "../UI/ButtonAdd";
import SliderItem from "./SliderItem";
import { IReview } from "../../models/models";
import { DUMMY_DATA } from "../../constanst/dummyData";
import SliderBtn from "./SliderBtn";
import ReviewModal from "../modal/ReviewModal";

const StyledSliderSection = styled.div`
  display: flex;
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
  width: ${({ slideNum }) => `${(slideNum + 1) * 100}%`};
  height: 100%;
  display: flex;
  padding-bottom: 64px;
  margin-left: ${({ curSlide }) => `${curSlide * -543}px`};
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

interface IBar {
  activeIndex: number;
}

const Bar = styled.button<IBar>`
  border: none;
  height: 4px;
  width: 12px;
  padding: 1px;
  margin-right: 6px;
  background-color: #bbbddc;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: #585cc6;
  }

  &:nth-child(${(props) => props.activeIndex + 1}) {
    width: 32px;
    background-color: #585cc6;
  }
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  padding-left: 34px;
`;

const SliderSection: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rewies, setRewiews] = useState<IReview[]>(DUMMY_DATA);
  const [curSlide, setCurSlide] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [disableLeftBtn, setDisableLeftBtn] = useState<boolean>(true);
  const [disableRightBtn, setDisableRightBtn] = useState<boolean>(false);


  useEffect(() => {
    if (curSlide === 0) {
      setDisableLeftBtn(true);
    } else {
      setDisableLeftBtn(false);
    }

    if (curSlide === rewies.length - 2) {
      setDisableRightBtn(true);
    } else {
      setDisableRightBtn(false);
    }
  }, [curSlide, rewies]);

  const nextSlideBarHandler = (index: number) => {
    setCurSlide(index);
    setActiveIndex(index);
  };

  const nextSlideBtnHandler = (isReverse: boolean) => {
    if (!isReverse) {
      setCurSlide((prev) => prev + 1);
      setActiveIndex((prev) => prev + 1);
    } else {
      setCurSlide((prev) => prev - 1);
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <StyledSliderSection>
      <Reviews>
        <Header>
          <Title>Отзывы</Title>
          <ButtonAdd onClick={() => setShowModal(true)}>
            Добавить отзыв
          </ButtonAdd>
        </Header>

        <SlidesWrapper>
          <Slides slideNum={rewies.length} curSlide={curSlide}>
            {rewies.map((rewiew) => (
              <SliderItem
                key={rewiew.id}
                name={rewiew.name}
                date={rewiew.date}
                imgUrl={rewiew.imgUrl}
                text={rewiew.text}
              />
            ))}
          </Slides>
          <Navigation>
            {rewies.map((rewiew, index) => {
              // this if check that the slider always displays 2 reviews (if rewiews odd number 3,5.7...)
              if (index < rewies.length - 1) {
                return (
                  <Bar
                    key={index}
                    activeIndex={activeIndex}
                    onClick={nextSlideBarHandler.bind(this, index)}
                  />
                );
              }
            })}
          </Navigation>
        </SlidesWrapper>
      </Reviews>
      <ActionSection>
        <SliderBtn
          isReverce={true}
          onClick={nextSlideBtnHandler}
          disabled={disableLeftBtn}
        />
        <SliderBtn
          isReverce={false}
          onClick={nextSlideBtnHandler}
          disabled={disableRightBtn}
        />
      </ActionSection>
      {showModal && <ReviewModal close={()=>{setShowModal(false)}}/>}
    </StyledSliderSection>
  );
};
export default SliderSection;
