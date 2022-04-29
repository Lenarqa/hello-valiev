import React, { useEffect, useState } from "react";
import Button from "../UI/myButton/Button";
import Overlay from "../UI/overlay/Overlay";
import EditReviewModal from "../modal/editReviewModal/EditReviewModal";
import style from "./ReviewItem.module.css";
import { ReactComponent as EditBtn } from "../../assets/icons/editBtn.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/сloseIcon.svg";
import { ReactComponent as PublishIcon } from "../../assets/icons/publishIcon.svg";
import { IOption } from "../../shared/models/models";

interface ISliderItem {
  type?: string;
  id: string;
  name: string;
  imgUrl: string | null;
  date: string;
  text: string;
  status?: string;
  selected?: IOption;
  cancelHandler?: (id: string) => void;
  publishHandler?: (id: string) => void;
  updateReviewText?: (updatedReviewText: string, id: string) => boolean;
  showGoodWindow?: (value: boolean) => void;
  showBadWindow?: (value: boolean) => void;
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
  updateReviewText,
  showGoodWindow,
  showBadWindow,
}) => {
  const [isCanceled, setIsCanseled] = useState<boolean>(false);
  const [isPublish, setIsPublish] = useState<boolean>(false);
  const [isEditRevie, setIsEditReview] = useState<boolean>(false);

  if (!imgUrl) {
    imgUrl = "user-0.png";
  }

  //если отзыв ранее отмечен как (отмененный/опубликованный),
  //то при переходе на другой фильтр убираем стиль, и переносим опубликованный в опубликованный
  //отмененный в отмененный
  useEffect(() => {
    if (selected?.id === status) {
      setIsCanseled(false);
      setIsPublish(false);
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

  const showEditWindowHandler = (): void => {
    setIsEditReview(true);
  };

  const closeEditWindowHandler = (): void => {
    setIsEditReview(false);
  };

  return (
    <>
      <div
        className={style.item}
        data-type={type}
        data-is-canceled={isCanceled}
        data-is-publish={isPublish}
      >
        <div className={style.header}>
          <div className={style.userInfo}>
            <img
              src={require(`../../assets/img/users/${imgUrl}`)}
              // src={`https://academtest.ilink.dev/images/${imgUrl}`}
              alt="photo"
            />
            <p>{name}</p>
          </div>
          <p>{date}</p>
        </div>
        <div className={style.content}>{text}</div>
        <div className={style.canceledMsg} data-is-canceled={isCanceled}>
          <CloseIcon />
          <h2>Отзыв отклонен</h2>
        </div>
        <div
          className={style.action}
          data-is-canceled={isCanceled}
          data-is-publish={isPublish}
        >
          <div>
            <Button type="submit" onClick={curPublishHandler}>
              Опубликовать
            </Button>
            <Button type="cancel" onClick={curCancelHandler}>
              Отклонить
            </Button>
          </div>
          <EditBtn className={style.editBtn} onClick={showEditWindowHandler} />
        </div>
        <div className={style.publishMsg} data-is-publish={isPublish}>
          <PublishIcon />
          <h2>Отзыв опубликован</h2>
        </div>
      </div>
      {isEditRevie && (
        <>
          <Overlay />
          <EditReviewModal
            close={closeEditWindowHandler}
            rewiewId={id}
            reviewText={text}
            updateReviewText={updateReviewText}
            showGoodWindow={showGoodWindow}
            showBadWindow={showBadWindow}
          />
        </>
      )}
    </>
  );
};
export default ReviewItem;
