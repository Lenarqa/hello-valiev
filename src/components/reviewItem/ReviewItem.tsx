import React, { useEffect, useState } from "react";
import Button from "../UI/button/Button";
import style from "./ReviewItem.module.css";
import { ReactComponent as EditBtn } from "../../assets/icons/editBtn.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/сloseIcon.svg";
import { ReactComponent as PublishIcon } from "../../assets/icons/publishIcon.svg";
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
  publishHandler?: (id: number) => void;
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
  publishHandler,
}) => {
  const [isCanceled, setIsCanseled] = useState<boolean>(false);
  const [isPublish, setIsPublish] = useState<boolean>(false);

  if (imgUrl.trim().length === 0) {
    imgUrl = "User-0.png";
  }

  //если отзыв ранее отмечен как (отмененный/опубликованный),
  //то при переходе на другой фильтр убираем стиль, и переносим опубликованный в опубликованный 
  //отмененный в отмененный
  useEffect(() => {
    if (selected!.id === status) {
      setIsCanseled(false);
      setIsPublish(false)
    }
  }, [selected, status]);

  const curCancelHandler = () => {
    if (cancelHandler !== undefined) {
      cancelHandler(id);
      setIsCanseled(true); //устанавливаем стиль отмененного
    }
  };

  const curPublishHandler = (): void => {
    if (publishHandler !== undefined) {
      publishHandler(id);
      setIsPublish(true);
    }
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
      <div className={style.canceledMsg} data-is-canceled={isCanceled}>
        <CloseIcon />
        <h2>Отзыв отклонен</h2>
      </div>
      <div className={style.action} data-is-canceled={isCanceled} data-is-publish={isPublish}>
        <div>
          <Button type="submit" onClick={curPublishHandler}>
            Опубликовать
          </Button>
          <Button type="cancel" onClick={curCancelHandler}>
            Отклонить
          </Button>
        </div>
        <EditBtn />
      </div>
      <div className={style.publishMsg} data-is-publish={isPublish}>
        <PublishIcon />
        <h2>Отзыв опубликован</h2>
      </div>
    </div>
  );
};
export default ReviewItem;
