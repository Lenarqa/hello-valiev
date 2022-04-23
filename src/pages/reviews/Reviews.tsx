import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./Reviews.module.css";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import Select from "../../components/UI/select/Select";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import { IOption, IReview } from "../../shared/models/models";
import { REVIEWS } from "../../shared/data/Reviews";
import ReviewItem from "../../components/reviewItem/ReviewItem";
import { sortByDate } from "../../shared/lib/sortReviews";
import GoodWindow from "../../components/UI/goodWindow/GoodWindow";
import BadWindow from "../../components/UI/badWindow/BadWindow";
import { PopUpContext } from "../../components/store/PopUpContext";
import ReviewItemSkeleton from "../../components/reviewItem/skeleton/ReviewsSkeleton";

const Reviews: React.FC = () => {
  const pageSize: number = 4;
  const [isLoadingPage, setisLoadingPage] = useState<boolean>(true);

  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<IOption>(DummyOptionsReview[0]); //0 - элемент, это элемент по дефолту отображающийся в селект;

  const [reviews, setReviews] = useState<IReview[]>(REVIEWS);
  const [filteredReviews, setFilteredReviews] = useState<IReview[]>(REVIEWS);

  const [isShowGoodWindow, setIsShowGoodWindow] = useState<boolean>(false);
  const [isShowBadWindow, setIsShowBadWindow] = useState<boolean>(false);

  // page loading
  const [curPage, setCurPage] = useState<number>(1);

  // если в controlPanelAboutMe была ошибка скрываем ее
  const popUpCtx = useContext(PopUpContext);
  useEffect(() => {
    popUpCtx.setIsError(false);
    popUpCtx.setIsOpenBadWindow(false);
    popUpCtx.setIsOpenGoodWindow(false);

    if(reviews.length === 0) {
      setIsEmptyPage(true);
    }

    setisLoadingPage(true);
    setTimeout(() => {
      setisLoadingPage(false);
    }, 1000);

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const onChangeFilterHandler = useCallback((option: IOption): void => {
    const curfilteredReviews: IReview[] = reviews.filter(
      (item) => item.status === option?.id
    );
    const sortedFilteredReviews = sortByDate(curfilteredReviews);

    setFilteredReviews(sortedFilteredReviews);
    setIsSelected(option);
    setCurPage(1);
  }, []);

  // начальная фильтрация, чтобы когда пользователь заходил на
  //страницу сразу были видны неопубликованные
  useEffect(() => {
    onChangeFilterHandler(selected);
  }, [onChangeFilterHandler]);

  const cancelHandler = (id: number): void => {
    setReviews((prev) => {
      const updatedReview: IReview | undefined = prev.find(
        (review) => review.id === id
      );

      const prevWithoutUpdated: IReview[] = prev.filter(
        (item) => item.id !== id
      );

      // такая ситуация не возможна, но пусть проверка будет
      if (updatedReview === undefined) {
        return prev;
      }

      updatedReview.status = 2; //2 = отклонен
      return [...prevWithoutUpdated, updatedReview];
    });
  };

  const publishHandler = (id: number): void => {
    setReviews((prev) => {
      const updatedReview: IReview | undefined = prev.find(
        (review) => review.id === id
      );

      const prevWithoutUpdated: IReview[] = prev.filter(
        (item) => item.id !== id
      );

      if (updatedReview === undefined) {
        return prev;
      }

      updatedReview.status = 3; //3 = опубликован
      return [...prevWithoutUpdated, updatedReview];
    });
  };

  const updateReviewTextHandler = (
    updatedReviewText: string,
    id: number
  ): boolean => {
    setReviews((prev) => {
      const updatedReview: IReview | undefined = prev.find(
        (review) => review.id === id
      );

      const prevWithoutUpdated: IReview[] = prev.filter(
        (item) => item.id !== id
      );

      if (updatedReview === undefined) {
        return prev;
      }

      updatedReview.text = updatedReviewText;
      return [...prevWithoutUpdated, updatedReview];
    });

    // временная проверка, если true то выпадает отзыв отправлен успешно
    // иначе ошибка
    const updatedReview: IReview | undefined = reviews.find(
      (review) => review.id === id
    );
    if (updatedReview?.text === updatedReviewText) {
      return true;
    } else {
      return false;
    }
  };

  // pagination
  const nextPageHandler = (): void => {
    setCurPage((prev) => prev + 1);
    setisLoadingPage(true);
    setTimeout(()=>{
      setisLoadingPage(false);
    }, 1000)
  };

  const scrollHandler = (event: any): void => {
    const scrollTop = document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;
    const windowInnerHeight = window.innerHeight;

    if (windowInnerHeight + scrollTop === offsetHeight) {
      nextPageHandler();
    }
  };

  return (
    <div className={style.container}>
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
            {filteredReviews
              .filter((rewiew, index) => index < pageSize * curPage)
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
                }else {
                  return <ReviewItemSkeleton key={index} />
                }
              })}
            {/* {isLoadingPage && <ReviewItemSkeleton />} */}
          </div>
        </div>
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
