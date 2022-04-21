import React from "react";
import Button from "../UI/button/Button";
import style from "./ReviewItem.module.css";
import { ReactComponent as EditBtn } from "../../assets/icons/editBtn.svg";

interface ISliderItem {
  type?: string;
  name: string;
  imgUrl: string;
  date: string;
  text: string;
}

const ReviewItem: React.FC<ISliderItem> = ({
  type,
  name,
  imgUrl,
  date,
  text,
}) => {
  if (imgUrl.trim().length === 0) {
    imgUrl = "User-0.png";
  }

  return (
    <div className={style.item} data-type={type}>
      <div className={style.header}>
        <div className={style.userInfo}>
          <img src={require(`../../assets/img/users/${imgUrl}`)} alt="photo" />
          <p>{name}</p>
        </div>
        <p>{date}</p>
      </div>
      <div className={style.content}>{text}</div>
      <div className={style.action}>
        <div>
          <Button type="submit">Опубликовать</Button>
          <Button type="cancel">Отклонить</Button>
        </div>
        <EditBtn />
      </div>
    </div>
  );
};
export default ReviewItem;
