import React, { useState } from "react";
import style from "./RewiewModal.module.css";
import ReactDOM from "react-dom";
import ButtonAdd from "../../UI/buttonAdd/ButtonAdd";
import HeaderButton from "../../UI/headerButton/HeaderButton";
import { ReactComponent as Info } from "../../../assets/icons/info.svg";
import FileItem from "../fileItem/FileItem";
import ErrorMsg from "../../UI/ErrorMsg/ErrorMsg";
import { FileModel } from "../../../shared/models/models";
import Overlay from "../../UI/overlay/Overlay";
type TextAreaChangeEventHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

interface IReviewModal {
  close: () => void;
  setShowGoodWindow: (value: boolean) => void;
}

const ReviewModal: React.FC<IReviewModal> = ({ close, setShowGoodWindow }) => {
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

  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
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

  const imgSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsErrorSending(false);
    if (e.currentTarget.files?.length !== 0) {
      const files = e.currentTarget.files;
      if (files) {
        const fileSize: number = files[0].size / 8 / 1024;

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
        setIsLoadingFile(true);
        setShowUsersFile(true);
        setIsErrorFile(false);
      }
    }
  };

  const deleteUserFileHandler = () => {
    setUserFile({} as FileModel);
    setShowUsersFile(false);
  };

  const fileUploadHandler = () => {
    document.getElementById("selectImg")?.click();
  };

  const textareaChangeHandler: TextAreaChangeEventHandler = (e) => {
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

  const sendDataHandler = () => {
    if (
      !isErrorName &&
      !isErrorFile &&
      !isErrorRewiew &&
      userName.trim().length > 0 &&
      userRewiew.trim().length > 0
    ) {
      alert(
        `ФИО - ${userName} \n Наименование фала - ${userFile?.name} \n Отзыв пользователя - ${userRewiew}`
      );
      setIsErrorSending(false);
      setShowGoodWindow(true);
      close();
    } else {
      setIsErrorSending(true);
      setErrorSengingMsg("Не все поля заполнены");
    }
  };

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <div className={style.styledReviewModal}>
        <div className={style.header}>
          <h2 className={style.title}>Отзыв</h2>
          <button className={style.btn} onClick={close} />
        </div>
        <div className={style.content}>
          <div className={style.item}>
            <div>
              <p className={style.label}>Как вас зовут?</p>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className={style.input}
                placeholder="Имя Фамилия"
                type="text"
                value={userName}
                onChange={changeNameHandler}
                data-is-error={isErrorName}
              />
              <input
                id="selectImg"
                type="file"
                style={{ display: "none" }}
                onChange={imgSelectHandler}
              />
              <ButtonAdd onClick={fileUploadHandler} isDisabled={disabledBtn}>
                Загрузить фото
              </ButtonAdd>
            </div>
            {isErrorName && <ErrorMsg>{errorNameMsg}</ErrorMsg>}
            {isErrorFile && <ErrorMsg>{errorFileMsg}</ErrorMsg>}
          </div>
          {showUsersFile && (
            <FileItem
              isBigFile={isBigFile}
              name={userFile?.name}
              isLoading={isLoadingFile}
              setIsLoading={setIsLoadingFile}
              deleteUserFile={deleteUserFileHandler}
            />
          )}
          <div className={style.item}>
            <p className={style.label}>Все ли вам понравилось?</p>
            <div className={style.textAreaWrapper}>
              <textarea
                className={style.textarea}
                placeholder="Напишите пару слов о вашем опыте."
                onChange={textareaChangeHandler}
                value={userRewiew}
                data-is-error={isErrorRewiew}
              />
              <div className={style.counter}>{userRewiew.length}/200</div>
            </div>
            {isErrorRewiew && <ErrorMsg>{errorRewiewMsg}</ErrorMsg>}
          </div>
        </div>
        <div className={style.actions}>
          <HeaderButton onClick={sendDataHandler}>Отправить отзыв</HeaderButton>
          <div className={style.actionsInfo}>
            <Info />
            <p className={style.actionText}>
              Все отзывы проходят модерацию в течение 2 часов
            </p>
          </div>
        </div>
        {isErrorSending && <ErrorMsg>{errorSendingMsg}</ErrorMsg>}
      </div>
    </>,
    document.getElementById("portal") as Element
  );
};
export default ReviewModal;
