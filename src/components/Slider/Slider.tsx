import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonAdd from "../UI/buttonAdd/ButtonAdd";
import ReviewItem from "../reviewItem/ReviewItem";
import { IReview, ITostData } from "../../shared/models/models";
import { REVIEWS } from "../../shared/data/Reviews";
import SliderBtn from "./sliderBtn/SliderBtn";
import ReviewModal from "../modal/rewiewModal/ReviewModal";
import { ReactComponent as ButtonAddIcon } from "../../assets/icons/buttonAdd.svg";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";

import useWindowDimensions from "../../functions/ScreenSize";

const StyledSliderSection = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 106px;

  @media (max-width: 1210px) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 321px) {
    margin-bottom: 82px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 56px;

  @media (max-width: 420px) {
    flex-direction: column;
    margin-bottom: 10px;
  }

  @media (max-width: 321px) {
    margin-bottom: 21px;
  }
`;

const Title = styled.h2`
  font-size: 68px;
  color: #333333;
  font-family: "Factor A";

  @media (max-width: 321px) {
    font-size: 32px;
  }
`;

const Reviews = styled.div`
  background-color: #fff;
  max-width: 1198px;
  padding: 74px 80px 0px 80px;

  @media (max-width: 1210px) {
    max-width: 560px;
    padding: 74px 20px 0px 20px;
  }

  @media (max-width: 590px) {
    max-width: 400px;
  }

  @media (max-width: 420px) {
    padding: 10px;
    max-width: 330px;
  }

  @media (max-width: 321px) {
    width: 100%;
    padding: 20px 16px;
  }
`;

// Slider logic
const SlidesWrapper = styled.div`
  overflow: hidden;
  height: 344px;
  width: 102%;
  position: relative;
  transition: 1s ease;

  @media (max-width: 590px) {
    height: 412px;
  }

  @media (max-width: 420px) {
    height: auto;
  }

  @media (max-width: 321px) {
    height: auto;
  }
`;

interface ISlider {
  slideNum: number;
  curSlide: number;
  sliderItemWith: number;
}

const Slides = styled.div<ISlider>`
  transition: 1s ease;
  width: ${({ slideNum, sliderItemWith }) => {
    return sliderItemWith < 321
      ? `${slideNum * 100}%`
      : `${(slideNum + 1) * 100}%`;
  }};
  height: 100%;
  display: flex;
  padding-bottom: 64px;
  margin-left: ${({ curSlide, sliderItemWith }) =>
    `${curSlide * sliderItemWith}px`};

  @media (max-width: 321px) {
    padding-bottom: 32px;
  }
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;

  @media (max-width: 321px) {
    bottom: 8px;
  }
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

  @media (max-width: 1380px) {
    display: none;
  }
`;

interface ISliderSection {
  setShowGoodWindow: (value: boolean) => void;
  setShowBadWindow: (value: boolean) => void;
  setTostData: (value: ITostData) => void;
}

const SliderSection: React.FC<ISliderSection> = (props) => {
  const { height, width } = useWindowDimensions();

  let sliderItemWidth = -543;

  if (width < 590) {
    sliderItemWidth = -356;
  }

  if (width < 420) {
    sliderItemWidth = -318;
  }

  if (width < 321) {
    sliderItemWidth = -300;
  }

  const filteredReviews = REVIEWS.filter((item)=>item.status === DummyOptionsReview[2].id); // Отображаем только отзывы со статусом допущен
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rewies, setRewiews] = useState<IReview[]>(filteredReviews);
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
          {width < 700 ? (
            <ButtonAddIcon
              onClick={() => setShowModal(true)}
              style={{ height: 42, width: 42 }}
            />
          ) : (
            <ButtonAdd onClick={() => setShowModal(true)}>
              Добавить отзыв
            </ButtonAdd>
          )}
        </Header>

        <SlidesWrapper>
          <Slides
            slideNum={rewies.length}
            curSlide={curSlide}
            sliderItemWith={sliderItemWidth}
          >
            {rewies.map((review) => (
              <ReviewItem
                key={review.id}
                id={review.id}
                name={review.name}
                date={review.date}
                imgUrl={review.imgUrl}
                text={review.text}
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
      {showModal && (
        <ReviewModal
          close={() => {
            setShowModal(false);
          }}
          setShowGoodWindow={props.setShowGoodWindow}
          setShowBadWindow={props.setShowBadWindow}
          setTostData={props.setTostData}
        />
      )}
    </StyledSliderSection>
  );
};
export default SliderSection;
