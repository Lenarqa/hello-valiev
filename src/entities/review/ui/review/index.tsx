import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Button } from "../../../../shared/ui/button";
import { Overlay } from "../../../../shared/ui/overlay";
import EditReviewModal from "../../../../components/modal/editReviewModal/EditReviewModal";
import style from "./index.module.css";
import { ReactComponent as EditBtn } from "../../../../assets/icons/editBtn.svg"; //editBtn.svg
import { ReactComponent as CloseIcon } from "../../../../assets/icons/сloseIcon.svg"; //сloseIcon.svg
import { ReactComponent as PublishIcon } from "../../../../assets/icons/publishIcon.svg"; //publishIcon.svg
import { IChangeReviewText } from "../../../../shared/models/models";
import { userReviewsStore } from "../../model/index";

interface IReview {
  type?: string;
  id: string;
  name: string;
  imgUrl: string | null;
  date: string;
  text: string;
  status?: string;
  showGoodWindow?: (value: boolean) => void;
  showBadWindow?: (value: boolean) => void;
}

export const Review: React.FC<IReview> = ({
  type,
  id,
  name,
  imgUrl,
  date,
  text,
  status,
  showGoodWindow,
  showBadWindow,
}) => {
  const [isCanceled, setIsCanseled] = useState<boolean>(false);
  const [isPublish, setIsPublish] = useState<boolean>(false);
  const [isEditRevie, setIsEditReview] = useState<boolean>(false);
  const isLoadingText = useStore(userReviewsStore.$isLoadingReviewChangeText);

  useEffect(() => {
    if (!isLoadingText) {
      setIsEditReview(false);
    }
  }, [isLoadingText]);

  let reviewImg;
  if (!imgUrl) {
    reviewImg = require(`../../../../assets/img/users/user-0.png`);
  } else {
    reviewImg = `https://academtest.ilink.dev/images/${imgUrl}`;
  }

  const cancelHandler = () => {
    const reviewData: IChangeReviewText = { id: id, text: "declined" };
    userReviewsStore.changeReviewStatus(reviewData);
    setIsCanseled(true);
  };

  const publishHandler = (): void => {
    const reviewData: IChangeReviewText = { id: id, text: "approved" };
    userReviewsStore.changeReviewStatus(reviewData);
    setIsPublish(true);
  };

  const showEditWindowHandler = (): void => {
    setIsEditReview(true);
    if (showBadWindow && showGoodWindow) {
      showBadWindow(false);
      showGoodWindow(false);
    }
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
        data-status={status}
      >
        <div className={style.header}>
          <div className={style.userInfo}>
            <img src={reviewImg} alt="photo" />
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
            <Button type="submit" onClick={publishHandler}>
              Опубликовать
            </Button>
            <Button type="cancel" onClick={cancelHandler}>
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
            showGoodWindow={showGoodWindow}
            showBadWindow={showBadWindow}
          />
        </>
      )}
    </>
  );
};
