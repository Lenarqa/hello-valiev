import { DummyOptionsCity } from "./../data/OptionsCity";
import { IMyInfo } from "./../models/models";
import { rusToTranslit, serializeUser } from "./../serializers/serializeUser";
import {
  createEffect,
  forward,
  createEvent,
  restore,
  createStore,
  sample,
} from "effector";

const getUserInfo = createEvent();

const getUserInfoFx = createEffect(async () => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = await fetch(
      "https://academtest.ilink.dev/user/getUserProfile",
      {
        method: "GET",
        headers: { authorization: "Bearer " + localTokenObj.accessToken },
      }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response));
    return serializeUser(response);
  }
});

forward({
  from: getUserInfo,
  to: getUserInfoFx,
});

const $userInfo = restore(getUserInfoFx, null);

const $isLoading = getUserInfoFx.pending;

const setUserInfo = createEvent<IMyInfo>();

$userInfo.on(setUserInfo, (_, state) => state);

//update user photo
const setUserPhoto = createEvent<File | null>();
const $curUserPhoto = createStore<File | null>(null).on(
  setUserPhoto,
  (_, state) => state
);

const sendUserPhoto = createEvent();
const sendUserPhotoFx = createEffect(async () => {
  console.log("sendUserPhoto Fx ");
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const curPhoto = $curUserPhoto.getState();

    if (curPhoto) {
      const formData = new FormData();
      formData.append("profileImage", curPhoto);
      console.log(formData);
      const response = await fetch(
        `https://academtest.ilink.dev/user/updatePhoto`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + localTokenObj.accessToken,
          },
          body: formData,
        }
      )
        .then((response) => response.text())
        .then((response) => JSON.parse(response));
      console.log(response);
      return response;
    }
  }
});

const $chanhedUserPhotoRes = restore(sendUserPhotoFx, null);

forward({
  from: sendUserPhoto,
  to: sendUserPhotoFx,
});

sample({
  clock: sendUserPhotoFx.doneData,
  target: getUserInfo,
});
// end update user photo

const sendUserInfo = createEvent<IMyInfo>();
const sendUserInfoFx = createEffect(async (userInfo: IMyInfo) => {
  console.log("sendUserInfoFx");
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    if (userInfo) {
      // console.log(userInfo);
      console.log(userInfo.name.split(" ")[1]);
      console.log(userInfo.name.split(" ")[0]);

      const year = parseInt(userInfo.birthday.split(".")[2]);
      const mounth = parseInt(userInfo.birthday.split(".")[1]);
      const day = parseInt(userInfo.birthday.split(".")[0]);
      const birthday = new Date(year, mounth - 1, day);
      console.log(birthday);

      const city = DummyOptionsCity.find((item) => item.id === userInfo.city);
      let resCity: string = "";
      if (city) {
        resCity = rusToTranslit(city?.value);
      }
      console.log(resCity);

      const gender = userInfo.gender === 1 ? "male" : "female";
      console.log(gender);

      const pet = userInfo.pet === 1 ? true : false;
      console.log(pet);

      console.log(userInfo.smallAboutMe);
      console.log(userInfo.aboutMeText);

      let paramsObj = {
        firstName: userInfo.name.split(" ")[1],
        lastName: userInfo.name.split(" ")[0],
        birthDate: birthday.toString(),
        cityOfResidence: resCity,
        gender: gender,
        hasPet: pet,
        smallAboutMe: userInfo.smallAboutMe,
        aboutMe: userInfo.aboutMeText,
      };

      const response = await fetch(
        `https://academtest.ilink.dev/user/updateInfo`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + localTokenObj.accessToken,
          },
          body: JSON.stringify(paramsObj),
        }
      )
        .then((response) => response.text())
        .then((response) => JSON.parse(response));
      console.log(response);
      return response;
    }
  }
});

forward({
  from: sendUserInfo,
  to: sendUserInfoFx,
});

const $sendUserInfoRes = restore(sendUserInfoFx, null);

// const $sendPhotoError = restore(sendUserPhotoFx, null);
const $isLoadingUserPhoto = sendUserPhotoFx.pending;

export const userStore = {
  getUserInfo,
  $userInfo,
  $isLoading,
  setUserInfo,
  sendUserPhoto,
  $isLoadingUserPhoto,
  setUserPhoto,
  $curUserPhoto,
  $chanhedUserPhotoRes,
  sendUserInfo,
};
