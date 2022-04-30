import React, { useEffect, useState } from "react";
import style from "./RewiewModal.module.css";
import ReactDOM from "react-dom";
import { useStore } from "effector-react";
import ButtonAdd from "../../UI/buttonAdd/ButtonAdd";
import HeaderButton from "../../UI/headerButton/HeaderButton";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info.svg";
import { ReactComponent as ReloadIcon } from "../../../assets/icons/reload.svg";
import FileItem from "../fileItem/FileItem";
import ErrorMsg from "../../UI/ErrorMsg/ErrorMsg";
import { FileModel } from "../../../shared/models/models";
import Overlay from "../../UI/overlay/Overlay";
import TextArea from "../../UI/textarea/TextArea";
import Input from "../../UI/input/Input";
import { caphaStore } from "../../../shared/effector/capha";
import { authStore } from "../../../shared/effector/auth";
import LoadingSpiner from "../../UI/loadingSpiner/LoadingSpiner";

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

  const [userCapha, setUserCapha] = useState<string>("");
  const [isErrorCapha, setIsErrorCapha] = useState<boolean>(false);
  const [errorCaphaMsg, setErrorCaphaMsg] = useState<string>("");

  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  useEffect(() => {
    console.log("hello");
    caphaStore.getCapha(authToken.accessToken);
  }, []);

  const capha = useStore(caphaStore.$capha);
  const isLoadingCapha = useStore(caphaStore.$isLoadingCapha);
  const authToken = useStore(authStore.$token);

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

  const changeCaphaHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setIsErrorCapha(false);
    const value = e.currentTarget.value;
    if(value.length === 0) {
      setIsErrorCapha(true);
      setErrorCaphaMsg("Это поле не может быть пустым!");
    }
    setUserCapha(value.replace(/[^\d]/g, ""));
  };

  const refreshCaphaHandler = () => {
    console.log("refreshCaphaHandler");
    caphaStore.getCapha(authToken.accessToken);
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
              <ButtonAdd onClick={fileUploadHandler} isDisabled={disabledBtn}>
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
            <div>
              <p className={style.label}>Введите код с картинки:</p>
              <div className={style.caphaSection}>
                <Input
                  type="caphaInput"
                  id="capha"
                  onChange={changeCaphaHandler}
                  placeholder="0000"
                  value={userCapha}
                  isError={isErrorCapha}
                  errorMsg={errorCaphaMsg}
                />
                <div className={style.caphaWrapper}>
                  {isLoadingCapha ? (
                    <LoadingSpiner type="icon"/>
                  ) : (
                    <img
                      src={capha.base64Image}
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
          <HeaderButton onClick={sendDataHandler}>Отправить отзыв</HeaderButton>
          <div className={style.actionsInfo}>
            <InfoIcon />
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
