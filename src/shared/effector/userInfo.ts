import { IMyInfo } from "./../models/models";
import { serializeUser } from "./../serializers/serializeUser";
import {
  createEffect,
  forward,
  createEvent,
  restore,
  createStore,
} from "effector";

const getUserInfo = createEvent<IMyInfo>();

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

// forward({ from: setUserInfo, to: $userInfo });

export const userStore = {
  getUserInfo,
  $userInfo,
  $isLoading,
  setUserInfo
};
