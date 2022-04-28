import { IUser } from "../models/models";
import { createEffect, forward, createEvent, restore } from "effector";

//get auth token
const getToken = createEvent<IUser>();

const getTokenFx = createEffect(async (user: IUser) => {
  const response = await fetch("https://academtest.ilink.dev/user/signIn", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      "email=" +
      encodeURIComponent(user.email) +
      "&password=" +
      encodeURIComponent(user.password),
  })
    .then((response) => response.text())
    .then((response) => JSON.parse(response));
  return response;
});

forward({
  from: getToken,
  to: getTokenFx,
});

const $token = restore(getTokenFx, "");

const $isLoading = getTokenFx.pending;

// get about me Info
const getUserInfo = createEvent<string>();

const getUserInfoFx = createEffect(async (token:string)=>{
    console.log(token)
    const response = await fetch("https://academtest.ilink.dev/user/getUserProfile", {
        method:"GET",
        headers: { authorization:"Bearer " + token },
    })
    .then((response) => response.text())
    .then((response) => JSON.parse(response));
    console.log(response)
})

forward({
    from: getUserInfo,
    to: getUserInfoFx,
  });

export const authStore = {
  $token,
  getToken,
  $isLoading,
  getUserInfo,
};
