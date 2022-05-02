import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "effector-react";
import style from "./Reviews.module.css";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import Select from "../../components/UI/select/Select";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import { IOption, IReview } from "../../shared/models/models";
import ReviewItem from "../../components/reviewItem/ReviewItem";
import { sortByDate } from "../../shared/lib/sortReviews";
import GoodWindow from "../../components/UI/goodWindow/GoodWindow";
import BadWindow from "../../components/UI/badWindow/BadWindow";
import { PopUpContext } from "../../components/store/PopUpContext";
import ReviewItemSkeleton from "../../components/reviewItem/skeleton/ReviewsSkeleton";
import { userRevievsStore } from "../../shared/effector/reviews";
import { authStore } from "../../shared/effector/auth";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";

const Reviews: React.FC = () => {
  const authToken = useStore(authStore.$token);
  const fethingReviews: IReview[] | undefined = useStore(
    userRevievsStore.$userReviews
  );

  const [isLoadingPage, setisLoadingPage] = useState<boolean>(true);

  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<IOption>(DummyOptionsReview[0]); //0 - элемент, это элемент по дефолту отображающийся в селект;

  const [reviews, setReviews] = useState<IReview[]>(
    fethingReviews as IReview[]
  );
  const [filteredReviews, setFilteredReviews] = useState<IReview[]>(
    fethingReviews as IReview[]
  );

  const [isShowGoodWindow, setIsShowGoodWindow] = useState<boolean>(false);
  const [isShowBadWindow, setIsShowBadWindow] = useState<boolean>(false);

  // page loading
  const [curPage, setCurPage] = useState<number>(1);

  // если в controlPanelAboutMe была ошибка скрываем ее
  const popUpCtx = useContext(PopUpContext);

  const isLoadingReviews = useStore(userRevievsStore.$isLoadingReviews);

  useEffect(() => {
    popUpCtx.setIsError(false);
    popUpCtx.setIsOpenBadWindow(false);
    popUpCtx.setIsOpenGoodWindow(false);

    if (reviews.length === 0) {
      setIsEmptyPage(true);
    }

    document.addEventListener("scroll", scrollHandler);

    // userRevievsStore.getUserReviews(authToken.accessToken);

    setTimeout(() => {
      setisLoadingPage(false);
    }, 500);

    return () => document.removeEventListener("scroll", scrollHandler);
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
  // страницу сразу были видны неопубликованные
  useEffect(() => {
    onChangeFilterHandler(selected);
  }, [onChangeFilterHandler]);

  const cancelHandler = (id: string): void => {
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

      updatedReview.status = "declined"; //отклонен
      return [...prevWithoutUpdated, updatedReview];
    });
  };

  const publishHandler = (id: string): void => {
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

      updatedReview.status = "approved"; //опубликован
      return [...prevWithoutUpdated, updatedReview];
    });
  };

  const updateReviewTextHandler = (
    updatedReviewText: string,
    id: string
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
      {isLoadingReviews ? (
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
                {filteredReviews
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
