import React, { useEffect, useState } from "react";
import Button from "../UI/button/Button";
import style from "./ReviewItem.module.css";
import { ReactComponent as EditBtn } from "../../assets/icons/editBtn.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/сloseIcon.svg";
import { IOption } from "../../shared/models/models";

interface ISliderItem {
  type?: string;
  id: number;
  name: string;
  imgUrl: string;
  date: string;
  text: string;
  status?: number;
  selected?: IOption;
  cancelHandler?: (id: number) => void;
}

const ReviewItem: React.FC<ISliderItem> = ({
  type,
  id,
  name,
  imgUrl,
  date,
  text,
  status,
  selected,
  cancelHandler,
}) => {
  const [isCanceled, setIsCanseled] = useState<boolean>(false);
  if (imgUrl.trim().length === 0) {
    imgUrl = "User-0.png";
  }

  //если отзыв ранее отмечен как отмененный,
  //то при переходе на другой статус убираем стиль отмененного
  useEffect(() => {
    if (selected!.id === status) {
      setIsCanseled(false);
    }
  }, [selected, status]);

  const curCancelHandler = () => {
    if (cancelHandler !== undefined) {
      cancelHandler(id);
      setIsCanseled(true); //устанавливаем стиль отмененного
    }
  };

  const curPublishHandler = ():void => {
    console.log("Publish");
  };

  return (
    <div className={style.item} data-type={type} data-is-canceled={isCanceled}>
      <div className={style.header}>
        <div className={style.userInfo}>
          <img src={require(`../../assets/img/users/${imgUrl}`)} alt="photo" />
          <p>{name}</p>
        </div>
        <p>{date}</p>
      </div>
      <div className={style.content}>{text}</div>
      {isCanceled ? (
        <div className={style.canceledMsg}>
          <CloseIcon />
          <h2>Отзыв отклонен</h2>
        </div>
      ) : (
        <div className={style.action}>
          <div>
            <Button type="submit" onClick={curPublishHandler}>Опубликовать</Button>
            <Button type="cancel" onClick={curCancelHandler}>
              Отклонить
            </Button>
          </div>
          <EditBtn />
        </div>
      )}
    </div>
  );
};
export default ReviewItem;
