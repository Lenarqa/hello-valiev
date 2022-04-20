import React, { useState } from "react";
import style from "./Reviews.module.css";
import EmptyScreen from "../../components/UI/emtyScreen/EmptyScreen";
import Select from "../../components/UI/select/Select";
import { DummyOptionsReview } from "../../shared/data/OptionsReviews";
import { IOption } from "../../shared/models/models";

const Reviews: React.FC = () => {
  const [isEmptyPage, setIsEmptyPage] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<IOption>(DummyOptionsReview[0]); //0 - элемент, это элемент по дефолту отображающийся в селект;

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
        </div>
      )}
    </div>
  );
};
export default Reviews;
