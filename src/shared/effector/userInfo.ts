import { serializeUser } from "./../serializers/serializeUser";
import { IUser } from "../models/models";
import { createEffect, forward, createEvent, restore } from "effector";


// get about me Info
const getUserInfo = createEvent<string>();

const getUserInfoFx = createEffect(async (token: string) => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = await fetch(
      "https://academtest.ilink.dev/user/getUserProfile",
      {
        method: "GET",
        // headers: { authorization:"Bearer " + token },
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

export const userStore = {
  getUserInfo,
  $userInfo,
  $isLoading,
};