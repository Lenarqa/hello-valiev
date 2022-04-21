import React from "react";
import style from "./EditReviewModal.module.css";

interface IEditReviewModal {
    close:()=>void;
}

const EditReviewModal: React.FC<IEditReviewModal> = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.header}>
        <h2 className={style.title}>Редактирование отзыва</h2>
        <button className={style.btn} onClick={props.close} />
      </div>
      <div>textArea</div>
      <div>actions</div>
    </div>
  );
};
export default EditReviewModal;
