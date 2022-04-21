import React, { useState } from "react";
import Button from "../../UI/button/Button";
import TextArea from "../../UI/textarea/TextArea";
import style from "./EditReviewModal.module.css";
import ErrorMsg from "../../UI/ErrorMsg/ErrorMsg";

type TextAreaChangeEventHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

interface IEditReviewModal {
  rewiewId: number;
  reviewText: string;
  close: () => void;
  updateReviewText?: (updatedReviewText: string, id: number) => boolean;
  showGoodWindow?: (value: boolean) => void;
  showBadWindow?: (value: boolean) => void;
}

const EditReviewModal: React.FC<IEditReviewModal> = (props) => {
  const [userReviewText, setUserReviewText] = useState<string>(
    props.reviewText
  );
  const [isErrorRewiew, setIsErrorRewiew] = useState<boolean>(false);
  const [errorRewiewMsg, setErrorRewiewMsg] = useState<string>("");

  const textAreaChangeHandler: TextAreaChangeEventHandler = (e): void => {
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
      props.updateReviewText !== undefined &&
      props.showGoodWindow !== undefined &&
      props.showBadWindow !== undefined
    ) {
      const updateRes = props.updateReviewText(userReviewText, props.rewiewId);
      props.close();
      updateRes ? props.showGoodWindow(true) : props.showBadWindow(false);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.header}>
        <h2 className={style.title}>Редактирование отзыва</h2>
        <button className={style.btn} onClick={props.close} />
      </div>
      <div className={style.content}>
        <div className={style.textAreaTitle}>Отзыв</div>
        <TextArea
          placeholder={"Не забудьте написать отзыв."}
          onChangeHandler={textAreaChangeHandler}
          value={userReviewText}
          msgLenght={userReviewText.length}
          maxLenght={500} //в шаблоне изначально есть отзывы где текст больше 200 символов, поэтому я увеличил макс-ное кол-во символов до 500
        />
        {isErrorRewiew && <ErrorMsg>{errorRewiewMsg}</ErrorMsg>}
      </div>
      <div className={style.actions}>
        <Button isDisable={isErrorRewiew} onClick={updateTextHandler}>
          Подтвердить редактирование
        </Button>
        <Button type="cancel" onClick={props.close}>
          Отмена
        </Button>
      </div>
    </div>
  );
};
export default EditReviewModal;
