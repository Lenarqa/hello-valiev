import React, { useCallback, useContext, useEffect, useState } from "react";
import { useStore } from "effector-react";
import style from "./Reviews.module.css";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import Select from "../../components/UI/select/Select";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import {
  IChangeReviewText,
  IOption,
  IReview,
} from "../../shared/models/models";
import ReviewItem from "../../components/reviewItem/ReviewItem";
import GoodWindow from "../../components/UI/goodWindow/GoodWindow";
import BadWindow from "../../components/UI/badWindow/BadWindow";
import { PopUpContext } from "../../components/store/PopUpContext";
import ReviewItemSkeleton from "../../components/reviewItem/skeleton/ReviewsSkeleton";
import { userReviewsStore } from "../../shared/effector/reviews";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";

const Reviews: React.FC = () => {
  const popUpCtx = useContext(PopUpContext);

  const changeTextRes = useStore(userReviewsStore.$changeTextRes);
  const isLoadingReviews = useStore(userReviewsStore.$isLoadingReviews);
  const isLoadingText = useStore(userReviewsStore.$isLoadingReviewChangeText);
  const [showEditReview, setShowEditReview] = useState<boolean>(false);
  const isLoadingStatus = useStore(
    userReviewsStore.$isLoadingReviewChangeStatus
  );
  const isLoadingFilteredReviews = useStore(
    userReviewsStore.$isLoadingFilteredUsers
  );
  const filteredReviews: IReview[] | undefined = useStore(
    userReviewsStore.$filteredReviews
  );
  const [isLoadingPage, setisLoadingPage] = useState<boolean>(true);

  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  //0 - элемент, это элемент по дефолту отображающийся в селект;
  const [selected, setIsSelected] = useState<IOption>(DummyOptionsReview[0]);

  useEffect(() => {
    popUpCtx.setIsError(false);
    popUpCtx.setIsOpenBadWindow(false);
    popUpCtx.setIsOpenGoodWindow(false);

    document.addEventListener("scroll", scrollHandler);

    if(changeTextRes){
      userReviewsStore.clearChangeTextRes({} as IReview);
    }

    userReviewsStore.getUserReviews([]);

    setTimeout(() => {
      setisLoadingPage(false);
    }, 500);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    if (!isLoadingReviews) {
      userReviewsStore.filterReviews(selected);
    }
  }, [selected, isLoadingReviews]);
  
  useEffect(() => {
    if(changeTextRes.text){
      setIsShowGoodWindow(true);
      return;
    }else if(changeTextRes.error){
      setIsShowBadWindow(true);
      return;
    }
    if(changeTextRes){
      setIsShowGoodWindow(false);
      setIsShowGoodWindow(false);
    }
  }, [changeTextRes]);

  const [isShowGoodWindow, setIsShowGoodWindow] = useState<boolean>(false);
  const [isShowBadWindow, setIsShowBadWindow] = useState<boolean>(false);

  // page loading
  const [curPage, setCurPage] = useState<number>(1);

  const onChangeFilterHandler = useCallback((option: IOption): void => {
    setIsSelected(option);
    setCurPage(1);
  }, []);

  // начальная фильтрация, чтобы когда пользователь заходил на
  // страницу сразу были видны неопубликованные
  useEffect(() => {
    onChangeFilterHandler(selected);
  }, [onChangeFilterHandler]);

  const cancelHandler = (id: string): void => {
    const reviewData: IChangeReviewText = { id: id, text: "declined" };
    userReviewsStore.changeReviewStatus(reviewData);
  };

  const publishHandler = (id: string): void => {
    const reviewData: IChangeReviewText = { id: id, text: "approved" };
    userReviewsStore.changeReviewStatus(reviewData);
  };

  const updateReviewTextHandler = (
    updatedReviewText: string,
    id: string
  ): boolean => {
    const reviewData: IChangeReviewText = { id: id, text: updatedReviewText };
    userReviewsStore.changeReviewText(reviewData);

    if(!isLoadingText) {
      setShowEditReview(true);
    }
    return true;
  };

  const nextPageHandler = () => {
    setCurPage((prev) => prev + 1);
    setisLoadingPage(true);
    setTimeout(() => {
      setisLoadingPage(false);
    }, 500);
  };

  const scrollHandler = (event: any): void => {
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight * 0.99) {
      nextPageHandler();
    }
  };

  return (
    <div className={style.container}>
      {isLoadingFilteredReviews ? (
        <div className={style.spinerWrapper}>
          <LoadingSpiner />
        </div>
      ) : (
        <>
          {isEmptyPage ? (
            <EmptyScreen text="Список участников пуст" />
          ) : (
            <div className={style.content}>
              <div className={style.contentHeader}>
                <h2>Отзывы</h2>
                <Select
                  type="review"
                  selected={selected}
                  setSelected={setIsSelected}
                  options={DummyOptionsReview}
                  onChange={onChangeFilterHandler}
                  closeGoodWindow={setIsShowGoodWindow}
                  closeBadWindow={setIsShowBadWindow}
                />
              </div>
              <div className={style.rewiews}>
                {filteredReviews!
                  .filter((rewiew, index) => index < 4 * curPage)
                  .map((review, index) => {
                    if (!isLoadingPage) {
                      return (
                        <ReviewItem
                          type="controlPanelReview"
                          key={review.id}
                          id={review.id}
                          name={review.name}
                          date={review.date}
                          imgUrl={review.imgUrl}
                          text={review.text}
                          cancelHandler={cancelHandler}
                          status={review.status}
                          selected={selected}
                          publishHandler={publishHandler}
                          updateReviewText={updateReviewTextHandler}
                          showGoodWindow={setIsShowGoodWindow}
                          showBadWindow={setIsShowBadWindow}
                        />
                      );
                    } else {
                      return <ReviewItemSkeleton key={index} />;
                    }
                  })}
              </div>
            </div>
          )}
        </>
      )}
      {isShowGoodWindow && (
        <GoodWindow
          title="Отзыв изменен"
          text="Отзыв успешно отредактирован!"
          setShowGoodWindow={setIsShowGoodWindow}
        />
      )}
      {isShowBadWindow && (
        <BadWindow
          title="Что-то не так..."
          text="Не получилось отредактировать отзыв. Попробуйте еще раз!"
          setShowBadWindow={setIsShowBadWindow}
        />
      )}
    </div>
  );
};
export default Reviews;
