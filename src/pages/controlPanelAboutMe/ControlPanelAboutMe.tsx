import React, { useState, useEffect, useContext } from "react";
import style from "./ControlPanelAboutMe.module.css";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil.svg";
import Button from "../../components/UI/myButton/Button";
import Input from "../../components/UI/input/Input";
import { MyInfo } from "../../shared/data/MyInfo";
import { IMyInfo, IValidationResult } from "../../shared/models/models";
import Select from "../../components/UI/select/Select";
import { DummyOptionsCity } from "../../shared/data/OptionsCity";
import { DummyOptionsGender } from "../../shared/data/OptionsGender";
import { DummyOptionsPet } from "../../shared/data/OptionsPet";
import { IOption } from "../../shared/models/models";
import TextArea from "../../components/UI/textarea/TextArea";
import ErrorMsg from "../../components/UI/ErrorMsg/ErrorMsg";
import { PopUpContext } from "../../components/store/PopUpContext";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";
import {
  bigAboutMeValidation,
  lastNameValidation,
  nameValidation,
  smallAboutMeValidation,
} from "../../shared/lib/validation/ControlPanelAboutMe";
type TextAreaChangeEventHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

const ControlPanelAboutMe: React.FC = () => {
  // пока нет проверки на загружено ли изображение, только выдаются ошибки
  const popUpCtx = useContext(PopUpContext);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IMyInfo>(MyInfo);
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  const [isHoverImg, setIsHoverImg] = useState<boolean>(false);
  const [isUserHaveImg, setIsUserHaveImg] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo.miniImgUrl !== "") {
      setIsUserHaveImg(true);
    }
  }, []);

  //selected Options city
  const curCity: IOption | undefined = DummyOptionsCity.find(
    (city) => city.id === userInfo.city
  );

  const [selectedCity, setSelectedCity] = useState<IOption>(curCity!);

  //selected Options gender
  const curGender: IOption | undefined = DummyOptionsGender.find(
    (gender) => gender.id === userInfo.gender
  );
  const [selectedGender, setSelectedGender] = useState<IOption>(curGender!);

  //selected Options pet
  const curPet: IOption | undefined = DummyOptionsPet.find(
    (pet) => pet.id === userInfo.pet
  );
  const [selectedPet, setSelectedPet] = useState<IOption>(curPet!);

  // name
  const [name, setName] = useState<string>(userInfo.name.split(" ")[1]);
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>("");
  const [isHoverName, setIsHoverName] = useState<boolean>(false);

  // lastname
  const [lastName, setLastName] = useState<string>(userInfo.name.split(" ")[0]);
  const [isLastNameError, setIsLastNameError] = useState<boolean>(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState<string>("");
  const [isHoverLastName, setIsHoverLastName] = useState<boolean>(false);

  // birthday
  const [birthday, setBirthday] = useState<string>(userInfo.birthday);
  const [isBirthdayError, setIsBirthdayError] = useState<boolean>(false);
  const [BirthdayErrorMsg, setBirthdayErrorMsg] = useState<string>("");
  const [isHoverBirthday, setIsHoverBirthday] = useState<boolean>(false);

  // smallAboutMe
  const [smallAboutMe, setSmallAboutMe] = useState<string>(
    userInfo.smallAboutMe
  );
  const [isErrorSmallAboutMe, setIsErrorSmallAboutMe] =
    useState<boolean>(false);
  const [errorSmallAboutMeMsg, setErrorSmallAboutMeMsg] = useState<string>("");

  // bigAboutMe
  const [bigAboutMe, setBigAboutMe] = useState<string>(userInfo.aboutMeText);
  const [isErrorBigAboutMe, setIsErrorBigAboutMe] = useState<boolean>(false);
  const [errorBigAboutMeMsg, setErrorBigAboutMeMsg] = useState<string>("");

  //loading img
  const [userImgFile, setUserImgFile] = useState<File>();
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

  // Out and Over handler
  const imgMouseOutHandler = (): void => {
    setIsHoverImg(false);
  };

  const imgMouseOverHandler = (): void => {
    setIsHoverImg(true);
  };

  const nameMouseOutHandler = (): void => {
    setIsHoverName(false);
  };

  const nameMouseOverHandler = (): void => {
    setIsHoverName(true);
  };

  const lastNameMouseOutHandler = (): void => {
    setIsHoverLastName(false);
  };

  const lastNameMouseOverHandler = (): void => {
    setIsHoverLastName(true);
  };

  const birthdayMouseOutHandler = (): void => {
    setIsHoverBirthday(false);
  };

  const birthdayMouseOverHandler = (): void => {
    setIsHoverBirthday(true);
  };
  // End Out and Over handler

  const startEditModeHandler = (): void => {
    setIsEditMode(true);
  };

  const finishEditModeHandler = (): void => {
    if (
      !isNameError &&
      !isLastNameError &&
      !isBirthdayError &&
      !isErrorSmallAboutMe &&
      !isErrorBigAboutMe
    ) {
      setUserInfo((prev) => {
        return {
          name: name,
          miniImgUrl: prev.mainImgUrl, //эти два поля остаются прежними, когда будет ответ с сервера нужно будет заменю
          mainImgUrl: prev.mainImgUrl,
          birthday: birthday,
          city: selectedCity.id,
          gender: selectedGender.id,
          year: prev.year, //если будет оставаться время то сделаю автоматический подсчет
          smallAboutMe: smallAboutMe,
          aboutMeText: bigAboutMe,
          pet: selectedPet.id,
        };
      });

      popUpCtx.setIsOpenGoodWindow(true);
      // popUpCtx.setIsOpenGoodWindow(true); в случае ошибки
      setIsEditMode(false);
    }
  };

  // name validation
  const nameValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = e.currentTarget.value;
    setNameErrorMsg("");
    setName(newValue);
    setIsNameError(false);

    const res: IValidationResult = nameValidation(newValue);
    if (res.result) {
      setIsNameError(true);
      setNameErrorMsg(res.errorMsg);
    }
  };

  // lastName validation
  const lastNameValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setLastNameErrorMsg("");
    setLastName(newValue);
    setIsLastNameError(false);

    const res: IValidationResult = lastNameValidation(newValue);
    if (res.result) {
      setIsLastNameError(true);
      setLastNameErrorMsg(res.errorMsg);
    }
  };

  // birthday validation
  const birthdayValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const today: number = Date.now();
    const newValue: string = e.currentTarget.value;
    const selectDate: number = Date.parse(newValue);

    setBirthdayErrorMsg("");
    setIsBirthdayError(false);

    const newValueFormat: string = `${newValue.split("-")[2]}.${
      newValue.split("-")[1]
    }.${newValue.split("-")[0]}`; //dd.mm.yyyy

    setBirthday(newValueFormat);

    if (selectDate > today) {
      setIsBirthdayError(true);
      setBirthdayErrorMsg("Дата должна быть не больше сегодняшней даты");
      return;
    }
  };

  // smallAboutMe logic
  const changeSmallAboutMeHandler: TextAreaChangeEventHandler = (e): void => {
    const res: IValidationResult = smallAboutMeValidation(e.target.value);

    if (res.result) {
      setIsErrorSmallAboutMe(true);
      setErrorSmallAboutMeMsg(res.errorMsg);
    } else {
      setIsErrorSmallAboutMe(false);
    }

    setSmallAboutMe(e.target.value);
  };

  const changeBigAboutMeHandler: TextAreaChangeEventHandler = (e): void => {
    const res: IValidationResult = bigAboutMeValidation(e.target.value);

    if (res.result) {
      setIsErrorBigAboutMe(true);
      setErrorBigAboutMeMsg(res.errorMsg);
    } else {
      setIsErrorBigAboutMe(false);
    }

    setBigAboutMe(e.target.value);
  };

  const imgSelectHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    popUpCtx.setIsError(false);
    if (e.currentTarget.files?.length !== 0) {
      const files: FileList | null = e.currentTarget.files;

      if (files) {
        const fileSize: number = files[0].size / 8 / 1024;

        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = function (e) {
            //внутри е.currentTarget есть ширина и высота картинки,
            //но я еще не понял как их оттуда достать.
            const myImg = e.currentTarget as HTMLElement;
            console.log(myImg);
          };
          img.src = window.URL.createObjectURL(files[0]);
        };
        reader.readAsDataURL(files[0]);

        if (fileSize > 5) {
          popUpCtx.setIsError(true);
          popUpCtx.setErrorMsg("Ошибка загрузки. Размер файла превышает 5Mb.");
          return;
        }

        const format: string = files[0].name.split(".")[1];
        if (format === "png" || format === "jpg" || format === "jpeg") {
          setIsLoadingFile(true);
          setUserImgFile(files[0]);
          setTimeout(() => {
            setIsLoadingFile(false);
          }, 1000);
        } else {
          popUpCtx.setIsError(true);
          popUpCtx.setErrorMsg(
            "Ошибка загрузки. Допустимы только форматы фото (png, jpg, jpeg)."
          );
          return;
        }
      }
    }
  };

  // load img
  const loadImgClickHandler = (): void => {
    document.getElementById("loadImg")?.click();
  };

  useEffect(() => {
    if (
      isNameError ||
      isLastNameError ||
      isBirthdayError ||
      isErrorSmallAboutMe ||
      isErrorBigAboutMe ||
      popUpCtx.isError
    ) {
      setIsBtnDisable(true);
    } else {
      popUpCtx.setIsError(false);
      setIsBtnDisable(false);
    }
  }, [
    isNameError,
    isLastNameError,
    isBirthdayError,
    isErrorSmallAboutMe,
    isErrorBigAboutMe,
    popUpCtx.isError, //ошибка изображения
  ]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.contentHeader}>
          <h2>Обо мне</h2>
        </div>
        <div className={style.aboutMe}>
          <div className={style.headerForm} data-is-edit-mode={isEditMode}>
            <div className={style.imgSection}>
              <div
                className={style.imgsContainer}
                data-is-loading={isLoadingFile}
              >
                {isLoadingFile && <LoadingSpiner type="icon" />}
                {!isLoadingFile && (
                  <img
                    className={style.smallImg}
                    src={
                      isUserHaveImg
                        ? require("../../assets/img/photo.jpg")
                        : require("../../assets/img/users/user-0.png")
                    }
                    alt="photo"
                    onMouseOver={imgMouseOverHandler}
                    onMouseOut={imgMouseOutHandler}
                  />
                )}
                <div
                  className={style.bigImgContainer}
                  data-is-hover={isHoverImg}
                >
                  <img
                    className={style.bigImg}
                    src={
                      isUserHaveImg
                        ? require("../../assets/img/photo.jpg")
                        : require("../../assets/img/users/user-0.png")
                    }
                    alt="photo"
                  />
                </div>
              </div>
              <div className={style.changePhoto}>
                <p>Фото профиля</p>
                <div className={style.headerAction}>
                  <PencilIcon />
                  <div
                    className={style.changePhotoBtn}
                    onClick={loadImgClickHandler}
                  >
                    Изменить фото
                  </div>
                  <Input
                    type="invisible"
                    id="loadImg"
                    inputType="file"
                    onChange={imgSelectHandler}
                  >
                    Изменить фото
                  </Input>
                </div>
              </div>
            </div>
            <Button type="submitAboutMe" onClick={startEditModeHandler}>
              Редактировать
            </Button>
          </div>
          <div className={style.inputsSection} data-is-edit-mode={isEditMode}>
            <div className={style.row}>
              <Input
                type="controlPanel"
                labelTitle="Имя"
                id="name"
                placeholder="Введите имя"
                onChange={nameValidationHandler}
                value={name}
                dataIsError={isNameError}
                mouseOverHandler={nameMouseOverHandler}
                mouseOutHandler={nameMouseOutHandler}
                isHover={isHoverName}
                errorMsg={nameErrorMsg}
                isError={isNameError}
              />
              <Input
                type="controlPanel"
                labelTitle="Фамилия"
                id="lastName"
                placeholder="Введите фамилию"
                onChange={lastNameValidationHandler}
                value={lastName}
                dataIsError={isLastNameError}
                mouseOverHandler={lastNameMouseOverHandler}
                mouseOutHandler={lastNameMouseOutHandler}
                isHover={isHoverLastName}
                errorMsg={lastNameErrorMsg}
                isError={isLastNameError}
              />
              <Input
                labelTitle="Дата рождения"
                inputType="date"
                id="birthday"
                placeholder="Введите дату"
                onChange={birthdayValidationHandler}
                value={`${birthday.split(".")[2]}-${birthday.split(".")[1]}-${
                  birthday.split(".")[0]
                }`}
                dataIsError={isBirthdayError}
                mouseOverHandler={birthdayMouseOverHandler}
                mouseOutHandler={birthdayMouseOutHandler}
                isHover={isHoverBirthday}
                errorMsg={BirthdayErrorMsg}
                isError={isBirthdayError}
                required={true}
              />
            </div>
            <div className={style.row}>
              <div className={style.selectWrapper}>
                <div className={style.itemTitle}>Город</div>
                <Select
                  type="city"
                  selected={selectedCity}
                  setSelected={setSelectedCity}
                  options={DummyOptionsCity}
                  onChange={setSelectedCity}
                />
              </div>
              <div className={style.selectWrapper}>
                <div className={style.itemTitle}>Пол</div>
                <Select
                  type="bigWidth"
                  selected={selectedGender}
                  setSelected={setSelectedGender}
                  options={DummyOptionsGender}
                  onChange={setSelectedGender}
                />
              </div>
              <div className={style.selectWrapper}>
                <div className={style.itemTitle}>Животное</div>
                <Select
                  type="smallWidth"
                  selected={selectedPet}
                  setSelected={setSelectedPet}
                  options={DummyOptionsPet}
                  onChange={setSelectedPet}
                />
              </div>
            </div>
            <div className={style.smallAboutMeRow}>
              <div className={style.itemTitle}>Краткая информация</div>
              <TextArea
                type="long"
                msgLenght={smallAboutMe.length}
                maxLenght={99}
                placeholder="Напишите краткую информацию о вас"
                value={smallAboutMe}
                onChangeHandler={changeSmallAboutMeHandler}
              />
              {isErrorSmallAboutMe && (
                <ErrorMsg>{errorSmallAboutMeMsg}</ErrorMsg>
              )}
            </div>
            <div className={style.bigAboutMeRow}>
              <div className={style.itemTitle}>О себе</div>
              <TextArea
                type="big"
                placeholder="Напишите что нибудь о себе"
                msgLenght={smallAboutMe.length}
                maxLenght={500}
                value={bigAboutMe}
                onChangeHandler={changeBigAboutMeHandler}
              />
              {isErrorBigAboutMe && <ErrorMsg>{errorBigAboutMeMsg}</ErrorMsg>}
            </div>
            <div className={style.actions} data-is-edit-mode={isEditMode}>
              <Button
                type="submitAboutMeControlPanel"
                onClick={finishEditModeHandler}
                isDisable={isBtnDisable}
              >
                Сохранить изменения
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ControlPanelAboutMe;
