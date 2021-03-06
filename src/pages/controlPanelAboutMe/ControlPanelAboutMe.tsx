import React, { useState, useEffect, useContext } from "react";
import { useStore } from "effector-react";
import style from "./ControlPanelAboutMe.module.css";
import { Button } from "../../shared/ui/button";
import Select from "../../components/UI/select/Select";
import Input from "../../components/UI/input/Input";
import TextArea from "../../components/UI/textarea/TextArea";
import ErrorMsg from "../../components/UI/ErrorMsg/ErrorMsg";
import LoadingSpiner from "../../components/UI/loadingSpiner/LoadingSpiner";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil.svg";
import { IMyInfo, IValidationResult } from "../../shared/models/models";
import { DummyOptionsCity } from "../../shared/data/OptionsCity";
import { DummyOptionsGender } from "../../shared/data/OptionsGender";
import { DummyOptionsPet } from "../../shared/data/OptionsPet";
import { IOption } from "../../shared/models/models";
import { PopUpContext } from "../../components/store/PopUpContext";
import {
  bigAboutMeValidation,
  lastNameValidation,
  nameValidation,
  smallAboutMeValidation,
} from "../../shared/lib/validation/ControlPanelAboutMe";
import { userStore } from "../../shared/effector/userInfo";

const ControlPanelAboutMe: React.FC = () => {
  const userInfoStore = useStore(userStore.$userInfo);
  const isLoadingUserInfo = useStore(userStore.$isLoading);
  const chanhedUserPhotoRes = useStore(userStore.$chanhedUserPhotoRes);
  const sendUserInfoRes = useStore(userStore.$sendUserInfoRes);
  const popUpCtx = useContext(PopUpContext);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  const [isUserHaveImg, setIsUserHaveImg] = useState<boolean>(false);

  useEffect(() => {
    userStore.getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfoStore?.mainImgUrl !== "") {
      setIsUserHaveImg(true);
    }
  }, [userInfoStore]);

  useEffect(() => {
    if(chanhedUserPhotoRes) {
      if (chanhedUserPhotoRes?.profileImage) {
        popUpCtx.setIsOpenGoodWindow(true);
      } else if(chanhedUserPhotoRes?.error){
        popUpCtx.setIsError(true);
          popUpCtx.setErrorMsg(
            "?????? ???????????????? ?????????????????????? ?????????????????? ?????????? ???? ????????????!"
          );
      }
    }
  }, [chanhedUserPhotoRes]);

  useEffect(() => {
    if(sendUserInfoRes) {
      if (sendUserInfoRes?.profileImage) {
        popUpCtx.setIsOpenGoodWindow(true);
        userStore.clearUserInfoRes({} as IMyInfo);
      } else if(sendUserInfoRes?.error){
        popUpCtx.setIsOpenBadWindow(true);
        userStore.clearUserInfoRes({} as IMyInfo);
      }
    }
  }, [sendUserInfoRes]);

  //selected Options city
  const curCity: IOption | undefined = DummyOptionsCity.find(
    (city) => city.id === userInfoStore?.city
  );

  const [selectedCity, setSelectedCity] = useState<IOption>(curCity!);

  //selected Options gender
  const curGender: IOption | undefined = DummyOptionsGender.find(
    (gender) => gender.id === userInfoStore?.gender
  );
  const [selectedGender, setSelectedGender] = useState<IOption>(curGender!);

  //selected Options pet
  const curPet: IOption | undefined = DummyOptionsPet.find(
    (pet) => pet.id === userInfoStore?.pet
  );
  const [selectedPet, setSelectedPet] = useState<IOption>(curPet!);

  // name
  const [name, setName] = useState<string>(userInfoStore!.name.split(" ")[0]);
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>("");

  // lastname
  const [lastName, setLastName] = useState<string>(
    userInfoStore!.name.split(" ")[1]
  );
  const [isLastNameError, setIsLastNameError] = useState<boolean>(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState<string>("");

  // birthday
  const [birthday, setBirthday] = useState<string>(userInfoStore!.birthday);
  const [isBirthdayError, setIsBirthdayError] = useState<boolean>(false);
  const [BirthdayErrorMsg, setBirthdayErrorMsg] = useState<string>("");

  // smallAboutMe
  const [smallAboutMe, setSmallAboutMe] = useState<string>(
    userInfoStore!.smallAboutMe
  );
  const [isErrorSmallAboutMe, setIsErrorSmallAboutMe] =
    useState<boolean>(false);
  const [errorSmallAboutMeMsg, setErrorSmallAboutMeMsg] = useState<string>("");

  // bigAboutMe
  const [bigAboutMe, setBigAboutMe] = useState<string>(
    userInfoStore!.aboutMeText
  );
  const [isErrorBigAboutMe, setIsErrorBigAboutMe] = useState<boolean>(false);
  const [errorBigAboutMeMsg, setErrorBigAboutMeMsg] = useState<string>("");

  //loading img
  const [userImgFile, setUserImgFile] = useState<File>();
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

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
      // ????????
      const newUserInfoData: IMyInfo = {
        id: userInfoStore?.id as string,
        name: lastName + " " + name,
        miniImgUrl: userInfoStore?.mainImgUrl as string,
        mainImgUrl: userInfoStore?.mainImgUrl as string,
        birthday: birthday,
        city: selectedCity.id as number,
        gender: selectedGender.id as number,
        year: userInfoStore?.year as number,
        smallAboutMe: smallAboutMe,
        aboutMeText: bigAboutMe,
        pet: selectedPet.id as number,
      };

      userStore.sendUserInfo(newUserInfoData);
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
      setBirthdayErrorMsg("???????? ???????????? ???????? ???? ???????????? ?????????????????????? ????????");
      return;
    }
  };

  // smallAboutMe logic
  const changeSmallAboutMeHandler: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e): void => {
    const res: IValidationResult = smallAboutMeValidation(e.target.value);

    if (res.result) {
      setIsErrorSmallAboutMe(true);
      setErrorSmallAboutMeMsg(res.errorMsg);
    } else {
      setIsErrorSmallAboutMe(false);
    }

    setSmallAboutMe(e.target.value);
  };

  const changeBigAboutMeHandler: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e): void => {
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
            //???????????? ??.currentTarget ???????? ???????????? ?? ???????????? ????????????????,
            //???? ?? ?????? ???? ?????????? ?????? ???? ???????????? ??????????????.
            const myImg = e.currentTarget as HTMLElement;
            // console.log(myImg);
          };
          img.src = window.URL.createObjectURL(files[0]);
        };
        reader.readAsDataURL(files[0]);

        if (fileSize > 5) {
          popUpCtx.setIsError(true);
          popUpCtx.setErrorMsg("???????????? ????????????????. ???????????? ?????????? ?????????????????? 5Mb.");
          return;
        }

        const format: string = files[0].name.split(".")[1];
        if (format === "png" || format === "jpg" || format === "jpeg") {
          setIsLoadingFile(true);
          // setUserImgFile(files[0]);
          userStore.setUserPhoto(files[0]);
          userStore.sendUserPhoto();
          setTimeout(() => {
            setIsLoadingFile(false);
          }, 1000);
        } else {
          popUpCtx.setIsError(true);
          popUpCtx.setErrorMsg(
            "???????????? ????????????????. ?????????????????? ???????????? ?????????????? ???????? (png, jpg, jpeg)."
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
    popUpCtx.isError, //???????????? ??????????????????????
  ]);

  return (
    <div className={style.container}>
      {isLoadingUserInfo ? (
        <div className={style.spinerWrapper}>
          <LoadingSpiner />
        </div>
      ) : (
        <>
          <div className={style.content}>
            <div className={style.contentHeader}>
              <h2>?????? ??????</h2>
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
                            ? `https://academtest.ilink.dev/images/${userInfoStore?.mainImgUrl}`
                            : require("../../assets/img/users/user-0.png")
                        }
                        alt="photo"
                      />
                    )}
                    <div className={style.bigImgContainer}>
                      <img
                        className={style.bigImg}
                        src={
                          isUserHaveImg
                            ? `https://academtest.ilink.dev/images/${userInfoStore?.mainImgUrl}`
                            : require("../../assets/img/users/user-0.png")
                        }
                        alt="photo"
                      />
                    </div>
                  </div>
                  <div className={style.changePhoto}>
                    <p>???????? ??????????????</p>
                    <div className={style.headerAction}>
                      <PencilIcon />
                      <div
                        className={style.changePhotoBtn}
                        onClick={loadImgClickHandler}
                      >
                        ???????????????? ????????
                      </div>
                      <Input
                        type="invisible"
                        id="loadImg"
                        inputType="file"
                        onChange={imgSelectHandler}
                      >
                        ???????????????? ????????
                      </Input>
                    </div>
                  </div>
                </div>
                <Button type="submitAboutMe" onClick={startEditModeHandler}>
                  ??????????????????????????
                </Button>
              </div>
              <div
                className={style.inputsSection}
                data-is-edit-mode={isEditMode}
              >
                <div className={style.row}>
                  <Input
                    type="controlPanel"
                    labelTitle="??????"
                    id="name"
                    placeholder="?????????????? ??????"
                    onChange={nameValidationHandler}
                    value={name}
                    dataIsError={isNameError}
                    errorMsg={nameErrorMsg}
                    isError={isNameError}
                    dataIsEdit={isEditMode}
                  />
                  <Input
                    type="controlPanel"
                    labelTitle="??????????????"
                    id="lastName"
                    placeholder="?????????????? ??????????????"
                    onChange={lastNameValidationHandler}
                    value={lastName}
                    dataIsError={isLastNameError}
                    errorMsg={lastNameErrorMsg}
                    isError={isLastNameError}
                    dataIsEdit={isEditMode}
                  />
                  <Input
                    labelTitle="???????? ????????????????"
                    inputType="date"
                    id="birthday"
                    placeholder="?????????????? ????????"
                    onChange={birthdayValidationHandler}
                    value={`${birthday.split(".")[2]}-${
                      birthday.split(".")[1]
                    }-${birthday.split(".")[0]}`}
                    dataIsError={isBirthdayError}
                    errorMsg={BirthdayErrorMsg}
                    isError={isBirthdayError}
                    required={true}
                    dataIsEdit={isEditMode}
                  />
                </div>
                <div className={style.row}>
                  <div className={style.selectWrapper}>
                    <div className={style.itemTitle}>??????????</div>
                    <Select
                      type="city"
                      selected={selectedCity}
                      setSelected={setSelectedCity}
                      options={DummyOptionsCity}
                      onChange={setSelectedCity}
                      dataIsEdit={isEditMode}
                    />
                  </div>
                  <div className={style.selectWrapper}>
                    <div className={style.itemTitle}>??????</div>
                    <Select
                      type="bigWidth"
                      selected={selectedGender}
                      setSelected={setSelectedGender}
                      options={DummyOptionsGender}
                      onChange={setSelectedGender}
                      dataIsEdit={isEditMode}
                    />
                  </div>
                  <div className={style.selectWrapper}>
                    <div className={style.itemTitle}>????????????????</div>
                    <Select
                      type="smallWidth"
                      selected={selectedPet}
                      setSelected={setSelectedPet}
                      options={DummyOptionsPet}
                      onChange={setSelectedPet}
                      dataIsEdit={isEditMode}
                    />
                  </div>
                </div>
                <div className={style.smallAboutMeRow}>
                  <div className={style.itemTitle}>?????????????? ????????????????????</div>
                  <TextArea
                    type="long"
                    msgLenght={smallAboutMe.length}
                    maxLenght={99}
                    placeholder="???????????????? ?????????????? ???????????????????? ?? ??????"
                    value={smallAboutMe}
                    onChangeHandler={changeSmallAboutMeHandler}
                    dataIsEdit={isEditMode}
                  />
                  {isErrorSmallAboutMe && (
                    <ErrorMsg>{errorSmallAboutMeMsg}</ErrorMsg>
                  )}
                </div>
                <div className={style.bigAboutMeRow}>
                  <div className={style.itemTitle}>?? ????????</div>
                  <TextArea
                    type="big"
                    placeholder="???????????????? ?????? ???????????? ?? ????????"
                    msgLenght={bigAboutMe.length}
                    maxLenght={600} //?? ???????? ???????????????????? ?? ?????????????? ?? ???????? 597 ????????????????, ?????????????? ???????????????? ?? 300 ???? 600
                    value={bigAboutMe}
                    onChangeHandler={changeBigAboutMeHandler}
                    dataIsEdit={isEditMode}
                  />
                  {isErrorBigAboutMe && (
                    <ErrorMsg>{errorBigAboutMeMsg}</ErrorMsg>
                  )}
                </div>
                <div className={style.actions} data-is-edit-mode={isEditMode}>
                  <Button
                    type="submitAboutMeControlPanel"
                    onClick={finishEditModeHandler}
                    isDisable={isBtnDisable}
                  >
                    ?????????????????? ??????????????????
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ControlPanelAboutMe;
