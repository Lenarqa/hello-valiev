import { serializeUser } from "./../serializers/serializeUser";
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

// // get about me Info
// const getUserInfo = createEvent<string>();

// const getUserInfoFx = createEffect(async (token: string) => {
//   const localToken = localStorage.getItem("auth");
//   if (localToken) {
//     const localTokenObj = JSON.parse(localToken);
//     const response = await fetch(
//       "https://academtest.ilink.dev/user/getUserProfile",
//       {
//         method: "GET",
//         // headers: { authorization:"Bearer " + token },
//         headers: { authorization: "Bearer " + localTokenObj.accessToken },
//       }
//     )
//       .then((response) => response.text())
//       .then((response) => JSON.parse(response));
//     serializeUser(response);
//   }
// });

// forward({
//   from: getUserInfo,
//   to: getUserInfoFx,
// });

export const authStore = {
  $token,
  getToken,
  $isLoading,
};
