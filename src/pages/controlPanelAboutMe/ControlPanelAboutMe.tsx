import React, { useState, useEffect } from "react";
import style from "./ControlPanelAboutMe.module.css";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil.svg";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import { MyInfo } from "../../shared/data/MyInfo";
import { IMyInfo } from "../../shared/models/models";
import Select from "../../components/UI/select/Select";
import { DummyOptionsCity } from "../../shared/data/OptionsCity";
import { DummyOptionsGender } from "../../shared/data/OptionsGender";
import { DummyOptionsPet } from "../../shared/data/OptionsPet";
import { IOption } from "../../shared/models/models";
import TextArea from "../../components/UI/textarea/TextArea";
import ErrorMsg from "../../components/UI/ErrorMsg/ErrorMsg";
type TextAreaChangeEventHandler = React.ChangeEventHandler<HTMLTextAreaElement>;

const ControlPanelAboutMe: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IMyInfo>(MyInfo);
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  const [isHoverImg, setIsHoverImg] = useState<boolean>(false);

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
  const [userImgUrl, setUserImgUrl] = useState<string>();
  const [isErrorSending, setIsErrorSending] = useState<boolean>(false);
  const [errorSendingMsg, setErrorSengingMsg] = useState<string>("");
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

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
          miniImgUrl: prev.mainImgUrl, //эти два поля остаются прежними, когда будет ответ с сервера я из заменю
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
      setIsEditMode(false);
    }
  };

  // name validation
  const setErrorName = (errorMsg: string) => {
    setIsNameError(true);
    setNameErrorMsg(errorMsg);
  };

  const nameValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setNameErrorMsg("");
    setName(newValue);
    setIsNameError(false);

    if (newValue.trim().length === 0) {
      setErrorName("Поле обязатльльно для заполнения");
      return;
    }

    if (/[^a-zA-Za-яA-Я]/.test(newValue)) {
      setErrorName("Имя может содержать только кириллицу или латиницу");
      return;
    }
  };

  // lastName validation
  const setErrorLastName = (errorMsg: string) => {
    setIsLastNameError(true);
    setLastNameErrorMsg(errorMsg);
  };

  const lastNameValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setLastNameErrorMsg("");
    setLastName(newValue);
    setIsLastNameError(false);

    if (newValue.trim().length === 0) {
      setErrorLastName("Поле обязатльльно для заполнения");
      return;
    }

    if (/[^a-zA-Za-яA-Я]/.test(newValue)) {
      setErrorLastName("Фамилия может содержать только кириллицу или латиницу");
      return;
    }
  };

  // birthday validation
  const setErrorBithday = (errorMsg: string) => {
    setIsBirthdayError(true);
    setBirthdayErrorMsg(errorMsg);
  };

  const birthdayValidationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const today: number = Date.now();

    const newValue: string = e.currentTarget.value;
    const selectDate: number = Date.parse(newValue);

    const newValueFormat: string = `${newValue.split("-")[2]}.${
      newValue.split("-")[1]
    }.${newValue.split("-")[0]}`; //dd.mm.yyyy

    setBirthdayErrorMsg("");
    setBirthday(newValueFormat);
    setIsBirthdayError(false);

    if (selectDate > today) {
      setErrorBithday("Дата должна быть не больше сегодняшней даты");
      return;
    }
  };

  // smallAboutMe logic
  const changeSmallAboutMeHandler: TextAreaChangeEventHandler = (e): void => {
    if (e.target.value.trim().length <= 0) {
      setSmallAboutMe(e.target.value);
      setIsErrorSmallAboutMe(true);
      setErrorSmallAboutMeMsg("Поле не может быть пустым");
      return;
    } else if (e.target.value.length === 99) {
      setIsErrorSmallAboutMe(true);
      setErrorSmallAboutMeMsg("Достигнуто максимальное число символов (100)");
    } else if (e.target.value.length < 100) {
      setSmallAboutMe(e.target.value);
      setIsErrorSmallAboutMe(false);
    }
  };

  const changeBigAboutMeHandler: TextAreaChangeEventHandler = (e): void => {
    if (e.target.value.trim().length <= 0) {
      setBigAboutMe(e.target.value);
      setIsErrorBigAboutMe(true);
      setErrorBigAboutMeMsg("Поле не может быть пустым");
      return;
    } else if (e.target.value.length === 299) {
      setBigAboutMe(e.target.value);
      setIsErrorBigAboutMe(true);
      setErrorBigAboutMeMsg("Достигнуто максимальное число символов (300)");
    } else if (e.target.value.length < 300) {
      setBigAboutMe(e.target.value);
      setIsErrorBigAboutMe(false);
    }
  };

  const imgSelectHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    setIsErrorSending(false);
    if (e.currentTarget.files?.length !== 0) {
      const files: FileList | null = e.currentTarget.files;
      if (files) {
        const fileSize: number = files[0].size / 8 / 1024;

        if (fileSize > 5) {
          setIsErrorSending(true);
          setErrorSengingMsg("Ошибка загрузки. Размер файла превышает 5Mb.");
          return;
        }

        const format: string = files[0].name.split(".")[1];
        if ("format === png" || format === "jpg" || format === "jpeg") {
          setIsLoadingFile(true);
          setUserImgFile(files[0]);
          setTimeout(() => {
            setIsLoadingFile(false);
          }, 1300);
        } else {
          setIsErrorSending(true);
          setErrorSengingMsg(
            "Ошибка загрузки. Допустимы только форматы фото (png, jpg, jpeg)."
          );
          return;
        }
      }
    }
  };

  // load img
  const loadImgClickHandler = (): void => {
    console.log("Change");
    document.getElementById("loadImg")?.click();
  };

  useEffect(() => {
    if (
      isNameError ||
      isLastNameError ||
      isBirthdayError ||
      isErrorSmallAboutMe ||
      isErrorBigAboutMe
    ) {
      setIsBtnDisable(true);
    } else {
      setIsBtnDisable(false);
    }
  }, [
    isNameError,
    isLastNameError,
    isBirthdayError,
    isErrorSmallAboutMe,
    isErrorBigAboutMe,
  ]);

  // img preview
  useEffect(() => {
    if (userImgFile) {
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setUserImgUrl(reader.result as string);
      };
      reader.readAsDataURL(userImgFile);
    } else {
      setUserImgUrl("../../assets/img/users/User-0.png");
    }
  }, [userImgFile]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.contentHeader}>
          <h2>Обо мне</h2>
        </div>
        <div className={style.aboutMe}>
          <div className={style.headerForm} data-is-edit-mode={isEditMode}>
            <div className={style.imgSection}>
              <div className={style.imgsContainer}>
                <img
                  className={style.smallImg}
                  src={require("../../assets/img/photo.jpg")}
                  // src={userImgUrl}
                  alt="photo"
                  onMouseOver={imgMouseOverHandler}
                  onMouseOut={imgMouseOutHandler}
                />

                <div
                  className={style.bigImgContainer}
                  data-is-hover={isHoverImg}
                >
                  <img
                    className={style.bigImg}
                    src={require("../../assets/img/photo.jpg")}
                    // src={userImgUrl}
                    alt="photo"
                  />
                </div>
              </div>
              <div className={style.changePhoto}>
                <p>Фото профиля</p>
                <div className={style.headerAction}>
                  <PencilIcon />
                  <div className={style.changePhotoBtn} data-is-edit-mode={isEditMode} onClick={loadImgClickHandler}>Изменить фото</div>
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
                value={bigAboutMe}
                onChangeHandler={changeBigAboutMeHandler}
              />
              {isErrorBigAboutMe && <ErrorMsg>{errorBigAboutMeMsg}</ErrorMsg>}
            </div>
            <div className={style.actions} data-is-edit-mode={isEditMode}>
              <Button
                type="submitAboutMe"
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
