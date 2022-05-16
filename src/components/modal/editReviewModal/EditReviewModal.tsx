import React, { useEffect, useState } from "react";
import Button from "../../UI/myButton/Button";
import TextArea from "../../UI/textarea/TextArea";
import style from "./EditReviewModal.module.css";
import ErrorMsg from "../../UI/ErrorMsg/ErrorMsg";
import { useStore } from "effector-react";
import { userReviewsStore } from "../../../entities/review/model/index";
import LoadingSpiner from "../../UI/loadingSpiner/LoadingSpiner";
import { IChangeReviewText } from "../../../shared/models/models";

interface IEditReviewModal {
  rewiewId: string;
  reviewText: string;
  close: () => void;
  updateReviewText?: (updatedReviewText: string, id: string) => boolean;
  showGoodWindow?: (value: boolean) => void;
  showBadWindow?: (value: boolean) => void;
}

const EditReviewModal: React.FC<IEditReviewModal> = (props) => {
  const [userReviewText, setUserReviewText] = useState<string>(
    props.reviewText
  );
  const [isErrorRewiew, setIsErrorRewiew] = useState<boolean>(false);
  const [errorRewiewMsg, setErrorRewiewMsg] = useState<string>("");
  const isLoadingText = useStore(userReviewsStore.$isLoadingReviewChangeText);

  const textAreaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ): void => {
    if (e.target.value.trim().length <= 0) {
      setUserReviewText(e.target.value);
      setIsErrorRewiew(true);
      setErrorRewiewMsg("Поле не может быть пустым");
      return;
    } else if (e.target.value.length < 501) {
      setUserReviewText(e.target.value);
      setIsErrorRewiew(false);
    }
  };

  const updateTextHandler = (): void => {
    if (
      props.showGoodWindow !== undefined &&
      props.showBadWindow !== undefined
    ) {
      const reviewData: IChangeReviewText = { id: props.rewiewId, text: userReviewText };
      userReviewsStore.changeReviewText(reviewData);
    }
  };

  return (
    <div className={style.modal}>
      {isLoadingText ? (
        <LoadingSpiner />
      ) : (
        <>
          <div className={style.header}>
            <h2 className={style.title}>Редактирование отзыва</h2>
            <button className={style.btn} onClick={props.close} />
          </div>
          <div className={style.content}>
            <div className={style.textAreaTitle}>Отзыв</div>
            <TextArea
              type="EditReviewModal"
              placeholder={"Не забудьте написать отзыв."}
              onChangeHandler={textAreaChangeHandler}
              value={userReviewText}
              msgLenght={userReviewText.length}
              maxLenght={600} //в шаблоне изначально есть отзывы где текст больше 200 символов, поэтому я увеличил макс-ное кол-во символов до 500
            />
            {isErrorRewiew && <ErrorMsg>{errorRewiewMsg}</ErrorMsg>}
          </div>
          <div className={style.actions}>
            <Button
              type="editReviewSubmit"
              isDisable={isErrorRewiew}
              onClick={updateTextHandler}
            >
              Подтвердить редактирование
            </Button>
            <Button type="editReviewCancel" onClick={props.close}>
              Отмена
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default EditReviewModal;
