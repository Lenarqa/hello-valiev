import React, { useState, useEffect } from "react";
import { useStore } from "effector-react";
import { Button } from "../../shared/ui/button";
import { ITostData } from "../../shared/models/models";
import SliderBtn from "./sliderBtn/SliderBtn";
import ReviewModal from "../modal/rewiewModal/ReviewModal";
import { ReactComponent as ButtonAddIcon } from "../../assets/icons/buttonAdd.svg";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import { addReviewStore } from "../../shared/effector/addReview";
import { userReviewsStore } from "../../entities/review/model/index";
import style from "./Slider.module.css";
import useWindowDimensions from "../../functions/ScreenSize";
import Carusel from "./Carusel";
import { Review } from "../../entities/review";

interface ISliderSection {
  setShowGoodWindow: (value: boolean) => void;
  setShowBadWindow: (value: boolean) => void;
  setTostData: (value: ITostData) => void;
}

const SliderSection: React.FC<ISliderSection> = (props) => {
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState<number>(0);

  let sliderItemWidth = 543;

  if (width < 590) {
    sliderItemWidth = -356;
  }

  if (width < 420) {
    sliderItemWidth = -318;
  }

  if (width < 321) {
    sliderItemWidth = -300;
  }

  const fethingReviews = useStore(userReviewsStore.$userReviews);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [disableLeftBtn, setDisableLeftBtn] = useState<boolean>(true);
  const [disableRightBtn, setDisableRightBtn] = useState<boolean>(false);

  const openModalHandler = () => {
    // перед открытием чистим стор эффектора
    props.setShowBadWindow(false);
    props.setShowGoodWindow(false);
    addReviewStore.setSendReviewError();
    addReviewStore.setUserPhoto(null);
    addReviewStore.setSendPhotoError();
    setShowModal(true);
  };

  useEffect(() => {
    if (offset === 0) {
      setDisableLeftBtn(true);
    } else {
      setDisableLeftBtn(false);
    }

    if (fethingReviews) {
      if (
        offset ===
        (fethingReviews!.filter(
          (item) => item.status === DummyOptionsReview[2].id
        ).length -
          2) *
          -sliderItemWidth
      ) {
        setDisableRightBtn(true);
      } else {
        setDisableRightBtn(false);
      }
    }
  }, [fethingReviews, offset]);

  const nextSlideBarHandler = (index: number) => {
    const newOffset = index * -sliderItemWidth;
    setOffset(newOffset);
    setActiveIndex(index);
  };

  const nextSlideBtnHandler = (isReverse: boolean) => {
    if (!isReverse) {
      setOffset((prev) => prev - sliderItemWidth);
      setActiveIndex((prev) => prev + 1);
    } else {
      setOffset((prev) => prev + sliderItemWidth);
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={style.sliderSection}>
      <div className={style.reviews}>
        <div className={style.header}>
          <h2>Отзывы</h2>
          {width < 700 ? (
            <ButtonAddIcon
              onClick={openModalHandler}
              style={{ height: 42, width: 42 }}
            />
          ) : (
            <Button onClick={openModalHandler} type="addBtn">Добавить отзыв</Button>
          )}
        </div>
        <Carusel offset={offset}>
          {fethingReviews
            ?.filter((item) => item.status === DummyOptionsReview[2].id)
            .map((review) => (
              <Review
                key={review.id}
                id={review.id}
                name={review.name}
                date={review.date}
                imgUrl={review.imgUrl}
                text={review.text}
              />
            ))}
        </Carusel>
        <div className={style.navigation}>
          {fethingReviews!.map((rewiew, index) => {
            // this if check that the slider always displays 2 reviews (if rewiews odd number 3,5.7...)
            if (
              index <
              fethingReviews!.filter(
                (item) => item.status === DummyOptionsReview[2].id
              ).length -
                1
            ) {
              return (
                <div
                  className={style.bar}
                  key={index}
                  data-is-active={activeIndex === index}
                  onClick={nextSlideBarHandler.bind(this, index)}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={style.actions}>
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
      </div>
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
    </div>
  );
};

export default SliderSection;
