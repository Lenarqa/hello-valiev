import React, { useState, useEffect } from "react";
import style from "./Reviews.module.css";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import Select from "../../components/UI/select/Select";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import { IOption, IReview } from "../../shared/models/models";
import { REVIEWS } from "../../shared/data/Reviews";
import ReviewItem from "../../components/reviewItem/ReviewItem";
import { sortByDate } from "../../shared/lib/sortReviews";

const Reviews: React.FC = () => {
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<IOption>(DummyOptionsReview[0]); //0 - элемент, это элемент по дефолту отображающийся в селект;
  const [reviews, setReviews] = useState<IReview[]>(REVIEWS);
  const [filteredReviews, setFilteredReviews] = useState<IReview[]>(REVIEWS);

  useEffect(() => {
    const curfilteredReviews:IReview[] = reviews.filter(item => item.status === selected.id);
    const sortedFilteredReviews = sortByDate(curfilteredReviews);
    setFilteredReviews(curfilteredReviews)
  }, [selected, reviews]);

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
            />
          </div>
          <div className={style.rewiews}>
            {filteredReviews.map((review) => (
              <ReviewItem
                type="controlPanelReview"
                key={review.id}
                name={review.name}
                date={review.date}
                imgUrl={review.imgUrl}
                text={review.text}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Reviews;
