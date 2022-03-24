import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ButtonAdd from "../UI/ButtonAdd";
import HeaderButton from "../UI/HeaderButton";
import { ReactComponent as Info } from "../../assets/icons/info.svg";
import FileItem from "./FileItem";
import ErrorMsg from "../UI/ErrorMsg";
import { FileModel } from "../../models/models";
type TextAreaChangeEventHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

const StyledReviewModal = styled.div`
  position: absolute;
  width: 676px;
  min-height: 443px;
  background-color: #fff;
  padding: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  @media (max-width: 321px) {
    width: 288px;
    height: auto;
    padding: 16px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: "Factor A";
  font-weight: 500;
  font-size: 24px;
  color: #333333;
`;

const Btn = styled.button`
  border: none;
  width: 18px;
  height: 18px;
  background-color: red;
  position: relative;
  background-color: transparent;
  cursor: pointer;

  &:before {
    position: absolute;
    top: 0px;
    left: 50%;
    content: " ";
    height: 17px;
    width: 2px;
    background-color: #333;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    top: 0px;
    left: 50%;
    content: " ";
    height: 17px;
    width: 2px;
    background-color: #333;
    transform: rotate(-45deg);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  @media (max-width: 321px) {
    margin-bottom: 32px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-top: 32px;
    margin-bottom: 0;
  }

  @media (max-width: 321px) {
    width: 288px;
    height: auto;
    margin-bottom: 0px;

    &:first-child {
      div {
        flex-direction: column;
      }
    }
    &:last-child {
      margin-top: 32px;
      
    }
  }
`;

interface IIput {
  isError: boolean;
}

const Input = styled.input<IIput>`
  transition: all 0.5s ease;
  font-family: "Gilroy-Regular";
  width: 395px;
  height: 52px;
  border: ${({ isError }) =>
    isError ? "1px solid #EB5757" : "1px solid #e0e0e0"};
  border-radius: 2px;
  margin-right: 16px;
  padding: 15px 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8a8a8a;

  @media (max-width: 321px) {
    width: 256px;
    margin-bottom: 12px;
  }
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const Counter = styled.div`
  font-family: "Gilroy-Regular";
  width: 30px;
  height: 14px;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #8a8a8a;
  position: absolute;
  right: 16px;
  bottom: 4px;

  @media (max-width: 321px) {
    right: 50px;
    bottom: 20px;
  }
`;

interface ITextarea {
  isError: boolean;
}
const Textarea = styled.textarea<ITextarea>`
  font-family: "Gilroy-Regular";
  border: ${({ isError }) =>
    isError ? "1px solid #EB5757" : "1px solid #e0e0e0;"};
  border-radius: 2px;
  width: 628px;
  height: 105px;
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8a8a8a;
  resize: none;

  @media (max-width: 321px) {
    width: 256px;
    margin-bottom: 12px;
  }
`;

const Label = styled.p`
  font-family: "Factor A";
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 14px;
`;

const ActionText = styled.p`
  font-family: "Gilroy-Regular";
  color: #8a8a8a;
  font-weight: 400;
  font-size: 12px;

  @media (max-width: 321px) {
    font-size: 10px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin: 0 10px 0 18px;
  }

  @media (max-width: 321px) {
    flex-direction: column-reverse;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.2);

  filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -ms-filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-filter: blur(01px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  z-index: 100;
`;

const ActionInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 321px) {
    margin-bottom: 12px;
  }
`;

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
      <StyledReviewModal>
        <Header>
          <Title>Отзыв</Title>
          <Btn onClick={close} />
        </Header>
        <Content>
          <Item>
            <div>
              <Label>Как вас зовут?</Label>
            </div>
            <div style={{ display: "flex" }}>
              <Input
                placeholder="Имя Фамилия"
                type="text"
                value={userName}
                onChange={changeNameHandler}
                isError={isErrorName}
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
          </Item>
          {showUsersFile && (
            <FileItem
              isBigFile={isBigFile}
              name={userFile?.name}
              isLoading={isLoadingFile}
              setIsLoading={setIsLoadingFile}
              deleteUserFile={deleteUserFileHandler}
            />
          )}
          <Item>
            <Label>Все ли вам понравилось?</Label>
            <TextareaWrapper>
              <Textarea
                placeholder="Напишите пару слов о вашем опыте."
                onChange={textareaChangeHandler}
                value={userRewiew}
                isError={isErrorRewiew}
              />
              <Counter>{userRewiew.length}/200</Counter>
            </TextareaWrapper>
            {isErrorRewiew && <ErrorMsg>{errorRewiewMsg}</ErrorMsg>}
          </Item>
        </Content>
        <Actions>
          <HeaderButton onClick={sendDataHandler}>Отправить отзыв</HeaderButton>
          <ActionInfo>
            <Info />
            <ActionText>
              Все отзывы проходят модерацию в течение 2 часов
            </ActionText>
          </ActionInfo>
        </Actions>
        {isErrorSending && <ErrorMsg>{errorSendingMsg}</ErrorMsg>}
      </StyledReviewModal>
    </>,
    document.getElementById("portal") as Element
  );
};
export default ReviewModal;
