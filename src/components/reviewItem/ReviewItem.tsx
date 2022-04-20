import React from "react";
import style from "./ReviewItem.module.css";

interface ISliderItem {
  type?:string;
  name: string;
  imgUrl: string;
  date: string;
  text: string;
}

const SliderItem: React.FC<ISliderItem> = ({ name, imgUrl, date, text }) => {
  if (imgUrl.trim().length === 0) {
    imgUrl = "User-0.png";
  }

  return (
    <div className={style.item}>
      <div className={style.header}>
        <div className={style.userInfo}>
          <img src={require(`../../assets/img/users/${imgUrl}`)} alt="photo" />
          <p>{name}</p>
        </div>
        <p>{date}</p>
      </div>
      <div className={style.content}>{text}</div>
    </div>
  );
};
export default SliderItem;
