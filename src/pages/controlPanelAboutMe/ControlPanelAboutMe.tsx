import React, { useState } from "react";
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

const ControlPanelAboutMe: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IMyInfo>(MyInfo);

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

  const nameMouseOutHandler = () => {
    setIsHoverName(false);
  };

  const nameMouseOverHandler = () => {
    setIsHoverName(true);
  };

  const lastNameMouseOutHandler = () => {
    setIsHoverLastName(false);
  };

  const lastNameMouseOverHandler = () => {
    setIsHoverLastName(true);
  };

  const birthdayMouseOutHandler = () => {
    setIsHoverBirthday(false);
  };

  const birthdayMouseOverHandler = () => {
    setIsHoverBirthday(true);
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

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.contentHeader}>
          <h2>Обо мне</h2>
        </div>
        <form className={style.aboutMe}>
          <div className={style.headerForm}>
            <div className={style.imgSection}>
              <img src={require("../../assets/img/photo.jpg")} alt="photo" />
              <div className={style.changePhoto}>
                <p>Фото профиля</p>
                <div className={style.headerAction}>
                  <PencilIcon />
                  <div>Изменить фото</div>
                </div>
              </div>
            </div>
            <Button type="submitAboutMe">Редактировать</Button>
          </div>
          <div className={style.inputsSection}>
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
                <div className={style.selectTitle}>Город</div>
                <Select
                  type="city"
                  selected={selectedCity}
                  setSelected={setSelectedCity}
                  options={DummyOptionsCity}
                  onChange={setSelectedCity}
                />
              </div>
              <div className={style.selectWrapper}>
                <div className={style.selectTitle}>Пол</div>
                <Select
                  type="bigWidth"
                  selected={selectedGender}
                  setSelected={setSelectedGender}
                  options={DummyOptionsGender}
                  onChange={setSelectedGender}
                />
              </div>
              <div className={style.selectWrapper}>
                <div className={style.selectTitle}>Животное</div>
                <Select
                  type="smallWidth"
                  selected={selectedPet}
                  setSelected={setSelectedPet}
                  options={DummyOptionsPet}
                  onChange={setSelectedPet}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ControlPanelAboutMe;
