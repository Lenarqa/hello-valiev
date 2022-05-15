import { IUser } from "../models/models";
import {
  createEffect,
  forward,
  createEvent,
  restore,
  sample,
  createStore,
} from "effector";

const getToken = createEvent<IUser>();

const getTokenFx = createEffect((user: IUser) => {
  const response = fetch("https://academtest.ilink.dev/user/signIn", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      "email=" +
      encodeURIComponent(user.email) +
      "&password=" +
      encodeURIComponent(user.password),
  })
    .then((response) => {
      if (!response.ok) {
        fetchErrorHandler(response.status);
      }
      return response.text()
    }
    )
    .then((response) => JSON.parse(response))
  return response;
});

forward({
  from: getToken,
  to: getTokenFx,
});

const $token = restore(getTokenFx, "");

const $isLoading = getTokenFx.pending;

// errors
const $authError = createStore("");
const setError = createEvent<string>();
const clearError = createEvent<string>();
$authError.on(setError, (_, state) => state)
$authError.on(clearError, (_, state) => '')

const fetchErrorHandler = (errorStatus: any) => {
  if (errorStatus === 500) {
    setError("Такого пользователя не существует");
  } else if (errorStatus === 400) {
    setError("Неправильный пароль!");
  } else {
    setError("Что то пошло не так!");
  }
};

export const authStore = {
  $token,
  getToken,
  $isLoading,
  $authError,
  clearError,
};
