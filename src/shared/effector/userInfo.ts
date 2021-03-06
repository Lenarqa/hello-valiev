
import { IMyInfo } from "./../models/models";
import { serializeUser, serializeUserPostRequest } from "./../serializers/serializeUser";
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
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    if (userInfo) {
      const sendData = serializeUserPostRequest(userInfo);
      const response = await fetch(
        `https://academtest.ilink.dev/user/updateInfo`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + localTokenObj.accessToken,
          },
          body: JSON.stringify(sendData),
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

sample({
  clock: sendUserInfoFx.doneData,
  target: getUserInfo,
});

const clearUserInfoRes = createEvent<IMyInfo>();
const $sendUserInfoRes = restore(sendUserInfoFx, null);
$sendUserInfoRes.on(clearUserInfoRes, (_, state) => state);

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
  $sendUserInfoRes,
  clearUserInfoRes
};
