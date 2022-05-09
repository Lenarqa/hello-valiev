import React, { useEffect, useState } from "react";
import style from "./RewiewModal.module.css";
import ReactDOM from "react-dom";
import { useStore } from "effector-react";
import ButtonAdd from "../../UI/buttonAdd/ButtonAdd";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/icons/reload.svg";
import FileItem from "../fileItem/FileItem";
import ErrorMsg from "../../UI/ErrorMsg/ErrorMsg";
import {
  FileModel,
  IReviewPost,
  ITostData,
} from "../../../shared/models/models";
import Overlay from "../../UI/overlay/Overlay";
import TextArea from "../../UI/textarea/TextArea";
import Input from "../../UI/input/Input";
import { caphaStore } from "../../../shared/effector/capha";
import { authStore } from "../../../shared/effector/auth";
import { addReviewStore } from "../../../shared/effector/addReview";
import { userReviewsStore } from "../../../shared/effector/reviews";
import LoadingSpiner from "../../UI/loadingSpiner/LoadingSpiner";
import Button from "../../UI/myButton/Button";

interface IReviewModal {
  close: () => void;
  setShowGoodWindow: (value: boolean) => void;
  setShowBadWindow: (value: boolean) => void;
  setTostData: (value: ITostData) => void;
}

const ReviewModal: React.FC<IReviewModal> = ({
  close,
  setShowGoodWindow,
  setShowBadWindow,
  setTostData,
}) => {
  const [userName, setUserName] = useState<string>("");
  const [userFile, setUserFile] = useState<FileModel>();
  const [userRewiew, setUserRewiew] = useState<string>("");

  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [errorNameMsg, setErrorNameMsg] = useState<string>("");

  const [isErrorFile, setIsErrorFile] = useState<boolean>(false);
  const [errorFileMsg, setErrorFileMsg] = useState<string>("");

  const [isErrorRewiew, setIsErrorRewiew] = useState<boolean>(false);
  const [errorRewiewMsg, setErrorRewiewMsg] = useState<string>("");

  const [isErrorSending, setIsErrorSending] = useState<boolean>(false);
  const [errorSendingMsg, setErrorSengingMsg] = useState<string>("");

  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showUsersFile, setShowUsersFile] = useState<boolean>(false);
  const [isBigFile, setIsBigFile] = useState<boolean>(false);

  const [userCapha, setUserCapha] = useState<string>("");
  const [isErrorCapha, setIsErrorCapha] = useState<boolean>(false);
  const [errorCaphaMsg, setErrorCaphaMsg] = useState<string>("");

  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  useEffect(() => {
    caphaStore.getCapha();
  }, []);

  const capha = useStore(caphaStore.$capha);
  const isLoadingCapha = useStore(caphaStore.$isLoadingCapha);
  const authToken = useStore(authStore.$token);

  const isLoadingAddReview = useStore(addReviewStore.$isLoadingAddReview);
  const sendReviewError = useStore(addReviewStore.$sendReviewError);
  const sendPhotoError = useStore(addReviewStore.$sendPhotoError);
  const isLoadingPostPhoto = useStore(addReviewStore.$isLoadingPostPhoto);

  let caphaImg = "";
  if (capha !== null) {
    caphaImg = capha.base64Image;
  }

  useEffect(() => {
    if (sendReviewError) {
      if (sendReviewError?.status === 400) {
        setTostData({ title: "Что-то не так...", msg: "Ошибка в капче!" });
        setShowBadWindow(true);
        close();
      } else if (
        sendReviewError?.status === 500 ||
        sendReviewError?.statusCode
      ) {
        setTostData({
          title: "Что-то не так...",
          msg: "Произошла ошибка попробуйте позже.",
        });
        setShowBadWindow(true);
        close();
      } else if (sendPhotoError) {
        if (sendPhotoError?.status === 500 || sendPhotoError?.statusCode) {
          setTostData({
            title: "Что-то не так ...",
            msg: "Произошла ошибка при отправке изображения.",
          });
          setShowBadWindow(true);
          close();
        }
      } else {
        setShowGoodWindow(true);
        userReviewsStore.getUserReviews([]);
        close();
      }
    }
  }, [sendReviewError, sendPhotoError]);

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setIsErrorSending(false);
    const value = e.currentTarget.value;
    if (value.trim().length === 0) {
      setUserName(value);
      setErrorNameMsg("Поле не может быть пустым");
      setIsErrorName(true);
      setDisabledBtn(true);
      return;
    } else if (value.length > 20) {
      setErrorNameMsg("Количество символов не должно превышать 20");
      setIsErrorName(true);
      return;
    } else {
      setDisabledBtn(false);
      setUserName(value);
      setIsErrorName(false);
    }
  };

  const imgSelectHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsErrorSending(false);
    if (e.currentTarget.files?.length !== 0) {
      const files = e.currentTarget.files;
      if (files) {
        const fileSize: number = files[0].size / 8 / 1024 / 1024;
        if (fileSize > 5) {
          setIsBigFile(true);
        } else {
          setIsBigFile(false);
        }

        if (showUsersFile) {
          setIsErrorFile(true);
          setErrorFileMsg("Может быть загружено только одно изображение.");
          return;
        }

        setUserFile(files[0]);
        addReviewStore.setUserPhoto(files[0]);
        setIsLoadingFile(true);
        setShowUsersFile(true);
        setIsErrorFile(false);
      }
    }
  };

  const deleteUserFileHandler = (): void => {
    setUserFile({} as FileModel);
    setShowUsersFile(false);
  };

  const fileUploadHandler = (): void => {
    document.getElementById("selectImg")?.click();
  };

  const textareaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ): void => {
    if (e.target.value.trim().length <= 0) {
      setIsErrorSending(false);
      setUserRewiew(e.target.value);
      setIsErrorRewiew(true);
      setErrorRewiewMsg("Поле не может быть пустым");
      return;
    } else if (e.target.value.length < 201) {
      setIsErrorSending(false);
      setUserRewiew(e.target.value);
      setIsErrorRewiew(false);
    }
  };

  const sendDataHandler = (): void => {
    if (
      !isErrorCapha &&
      !isErrorName &&
      !isErrorFile &&
      !isErrorRewiew &&
      userName.trim().length > 0 &&
      userRewiew.trim().length > 0
    ) {
      const review: IReviewPost = {
        authorName: userName,
        title: "defautl Title",
        text: userRewiew,
        captchaKey: capha.key,
        captchaValue: userCapha,
      };

      addReviewStore.sendReview(review);
      setIsErrorSending(false);
    } else {
      setIsErrorSending(true);
      setErrorSengingMsg("Не все поля заполнены");
    }
  };

  const changeCaphaHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setIsErrorSending(false);
    setIsErrorCapha(false);
    const value = e.currentTarget.value;
    if (value.length === 0) {
      setIsErrorCapha(true);
      setErrorCaphaMsg("Это поле не может быть пустым!");
    }
    setUserCapha(value.replace(/[^\d]/g, ""));
  };

  const refreshCaphaHandler = (): void => {
    caphaStore.getCapha();
  };

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <div className={style.styledReviewModal}>
        {isLoadingAddReview || isLoadingPostPhoto ? (
          <LoadingSpiner />
        ) : (
          <>
            <div className={style.header}>
              <h2 className={style.title}>Отзыв</h2>
              <button className={style.btn} onClick={close} />
            </div>
            <div className={style.content}>
              <div className={style.item}>
                <p className={style.label}>Как вас зовут?</p>
                <div className={style.itemContent}>
                  <Input
                    id="userName"
                    type="userName"
                    onChange={changeNameHandler}
                    value={userName}
                    dataIsError={isErrorName}
                  />
                  <input
                    id="selectImg"
                    type="file"
                    style={{ display: "none" }}
                    onChange={imgSelectHandler}
                  />
                  <ButtonAdd
                    type="addImg"
                    onClick={fileUploadHandler}
                    isDisabled={disabledBtn}
                  >
                    Загрузить фото
                  </ButtonAdd>
                </div>
                {isErrorName && <ErrorMsg>{errorNameMsg}</ErrorMsg>}
                {isErrorFile && <ErrorMsg>{errorFileMsg}</ErrorMsg>}
                {showUsersFile && (
                  <FileItem
                    isBigFile={isBigFile}
                    name={userFile?.name}
                    isLoading={isLoadingFile}
                    setIsLoading={setIsLoadingFile}
                    deleteUserFile={deleteUserFileHandler}
                  />
                )}
              </div>
              <div className={style.item}>
                <p className={style.label}>Все ли вам понравилось?</p>
                <TextArea
                  placeholder={"Напишите пару слов о вашем опыте."}
                  onChangeHandler={textareaChangeHandler}
                  value={userRewiew}
                  dataIsError={isErrorRewiew}
                  msgLenght={userRewiew.length}
                  maxLenght={200}
                />
                {isErrorRewiew && <ErrorMsg>{errorRewiewMsg}</ErrorMsg>}
              </div>
              <div className={style.item}>
                <div className={style.caphaSection}>
                  <div className={style.inputWrapper}>
                    <p className={style.label}>Введите код с картинки:</p>
                    <Input
                      type="caphaInput"
                      id="capha"
                      onChange={changeCaphaHandler}
                      placeholder="0000"
                      value={userCapha}
                      dataIsError={isErrorCapha}
                      isError={isErrorCapha}
                      errorMsg={errorCaphaMsg}
                    />
                  </div>
                  <div className={style.caphaActions}>
                    <div className={style.caphaWrapper}>
                      {isLoadingCapha ? (
                        <LoadingSpiner type="icon" />
                      ) : (
                        <img
                          src={caphaImg}
                          alt="capha"
                          className={style.caphaImg}
                        />
                      )}
                    </div>
                    <div
                      className={style.iconWrapper}
                      onClick={refreshCaphaHandler}
                    >
                      <ReloadIcon className={style.reloadIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.actions}>
              <Button type="reviews" onClick={sendDataHandler}>
                Отправить отзыв
              </Button>
              <div className={style.actionsInfo}>
                <InfoIcon />
                <p className={style.actionText}>
                  Все отзывы проходят модерацию в течение 2 часов
                </p>
              </div>
            </div>
            {isErrorSending && <ErrorMsg>{errorSendingMsg}</ErrorMsg>}
          </>
        )}
      </div>
    </>,
    document.getElementById("portal") as Element
  );
};
export default ReviewModal;
