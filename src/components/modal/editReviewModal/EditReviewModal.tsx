import React from "react";
import Button from "../../UI/button/Button";
import TextArea from "../../UI/textarea/TextArea";
import style from "./EditReviewModal.module.css";

interface IEditReviewModal {
  close: () => void;
}

const EditReviewModal: React.FC<IEditReviewModal> = (props) => {
  const textAreaChangeHandler = ():void => {
    console.log("Change textarea");
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
          value={"userRewiew"}
          msgLenght={0}
          maxLenght={200}
        />
      </div>
      <div className={style.actions}>
        <Button>Подтвердить редактирование</Button>
        <Button type="cancel" onClick={props.close}>
          Отмена
        </Button>
      </div>
    </div>
  );
};
export default EditReviewModal;
