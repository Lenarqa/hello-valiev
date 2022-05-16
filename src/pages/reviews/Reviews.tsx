import React, { useCallback, useContext, useEffect, useState } from "react";
import { useStore } from "effector-react";
import style from "./Reviews.module.css";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import Select from "../../components/UI/select/Select";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import {
  IOption,
  IReview,
  ITostData,
} from "../../shared/models/models";
import GoodWindow from "../../components/UI/goodWindow/GoodWindow";
import BadWindow from "../../components/UI/badWindow/BadWindow";
import { PopUpContext } from "../../components/store/PopUpContext";
// import ReviewItemSkeleton from "../../components/reviewItem/skeleton/ReviewsSkeleton";
import { userReviewsStore } from "../../entities/review/model/index";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";
import { Review, ReviewSkeleton } from "../../entities/review";

const Reviews: React.FC = () => {
  const popUpCtx = useContext(PopUpContext);

  const [tostData, setTostData] = useState<ITostData>();
  const changeTextRes = useStore(userReviewsStore.$changeTextRes);
  const isLoadingReviews = useStore(userReviewsStore.$isLoadingReviews);
  const changeStatusRes = useStore(userReviewsStore.$changeReviewStatusRes);
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

    if (changeTextRes) {
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
    if (changeTextRes.text) {
      setTostData({
        title: "Отзыв изменен",
        msg: "Отзыв успешно отредактирован!",
      });
      setIsShowGoodWindow(true);
      return;
    } else if (changeTextRes.error) {
      setTostData({
        title: "Что-то не так...",
        msg: "Не получилось отредактировать отзыв. Попробуйте еще раз!",
      });
      setIsShowBadWindow(true);
      return;
    }
    if (changeTextRes) {
      setIsShowGoodWindow(false);
      setIsShowGoodWindow(false);
    }
  }, [changeTextRes]);

  useEffect(()=>{
    console.log(changeStatusRes);
    if(changeStatusRes.status === "declined") {
      setTostData({
        title: "Отзыв отклонен",
        msg: "Отзыв успешно отклонен!",
      });
      setIsShowGoodWindow(true);
      return;
    }else if (changeStatusRes.status === "approved") {
      setTostData({
        title: "Отзыв опубликован",
        msg: "Отзыв успешно опубликован!",
      });
      setIsShowGoodWindow(true);
      return;
    }else if(changeStatusRes.error) {
      setTostData({
        title: "Что то пощло не так",
        msg: "Ой ой что то не так!",
      });
      setIsShowBadWindow(true);
    }
  },[changeStatusRes])

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
      {isLoadingFilteredReviews || isLoadingReviews ? (
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
                        <Review
                          type="controlPanelReview"
                          key={review.id}
                          id={review.id}
                          name={review.name}
                          date={review.date}
                          imgUrl={review.imgUrl}
                          text={review.text}
                          status={review.status}
                          showGoodWindow={setIsShowGoodWindow}
                          showBadWindow={setIsShowBadWindow}
                        />
                      );
                    } else {
                      return <ReviewSkeleton key={index} />;
                    }
                  })}
              </div>
            </div>
          )}
        </>
      )}
      {isShowGoodWindow && (
        <GoodWindow
          title={tostData!.title}
          text={tostData!.msg}
          setShowGoodWindow={setIsShowGoodWindow}
        />
      )}
      {isShowBadWindow && (
        <BadWindow
          title={tostData!.title}
          text={tostData!.msg}
          setShowBadWindow={setIsShowBadWindow}
        />
      )}
    </div>
  );
};
export default Reviews;
