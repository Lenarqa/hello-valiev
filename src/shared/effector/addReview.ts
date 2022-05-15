import { IReviewPost } from "./../models/models";

import {
  sample,
  createStore,
  createEffect,
  forward,
  createEvent,
  restore,
} from "effector";

// sendReview
const sendReview = createEvent<IReviewPost>();

const sendReviewFx = createEffect((review: IReviewPost) => {
  const response = fetch("https://academtest.ilink.dev/reviews/create", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      "authorName=" +
      encodeURIComponent(review.authorName) +
      "&title=" +
      encodeURIComponent(review.title) +
      "&text=" +
      encodeURIComponent(review.text) +
      "&captchaKey=" +
      encodeURIComponent(review.captchaKey) +
      "&captchaValue=" +
      encodeURIComponent(review.captchaValue),
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      console.log(response);
      return JSON.parse(response);
    });
  fetchErrorAddReviewHandler(response);
  return response;
});

forward({
  from: sendReview,
  to: sendReviewFx,
});

const $sendReviewRes = restore(sendReviewFx, null);

const setSendReviewError = createEvent();
$sendReviewRes.on(setSendReviewError, (_, state) => null);

const $isLoadingAddReview = sendReviewFx.pending;

// sendPhoto
const sendPhoto = createEvent<string>();
const sendPhotoFx = createEffect((id: string) => {
  console.log("sendPhotoFx ");
  const curPhoto = $cutUserPhoto.getState();
  if (curPhoto) {
    const formData = new FormData();
    formData.append("authorImage", curPhoto);

    const response = fetch(
      `https://academtest.ilink.dev/reviews/updatePhoto/${id}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response));
    // console.log(response);
    fetchErrorSendPhotoHandler(response)
    return response;
  }
});

forward({
  from: sendPhoto,
  to: sendPhotoFx,
});

const $sendPhotoError = restore(sendPhotoFx, null);
const $isLoadingPostPhoto = sendPhotoFx.pending;

const setSendPhotoError = createEvent();
$sendPhotoError.on(setSendPhotoError, (_, state) => null);

// set user Photo
const setUserPhoto = createEvent<File | null>();
const $cutUserPhoto = createStore<File | null>(null).on(
  setUserPhoto,
  (_, state) => state
);

sample({
  clock: sendReviewFx.doneData,
  source: $sendReviewRes,
  fn: (review, _) => review.id,
  target: sendPhotoFx,
});

// errors add review
const $addReviewError = createStore("");
const setAddReviewErr = createEvent<string>();
const clearAddReviewErr = createEvent<string>();
$addReviewError.on(setAddReviewErr, (_, state) => state);
$addReviewError.on(clearAddReviewErr, (_, state) => "");

const fetchErrorAddReviewHandler = (response: Promise<any>): void => {
  response.then((data) => {
    if (data.status === 400) {
      setAddReviewErr("Ошибка в капче!");
    } else if(data.status > 400 && data.status < 600) {
        setAddReviewErr("Произошла ошибка попробуйте позже.");
    }
  });
};

// errors sendPhoto
const fetchErrorSendPhotoHandler = (response: Promise<any>): void => {
  response.then((data) => {
    if (data.status === 500 || data.statusCode === 404) {
      setSendPhotoErrorNew("Произошла ошибка при отправке изображения.");
    } else if(data.status > 400 && data.status < 600) {
      setAddReviewErr("Произошла ошибка попробуйте позже.");
    }
  });
};
const $sendPhotoErrorNew = createStore("");
const setSendPhotoErrorNew = createEvent<string>();
const clearSendPhotoErrorNew = createEvent<string>();
$addReviewError.on(setSendPhotoErrorNew, (_, state) => state);
$addReviewError.on(clearSendPhotoErrorNew, (_, state) => "");

export const addReviewStore = {
  $sendReviewRes,
  sendReview,
  $isLoadingAddReview,
  setSendReviewError,
  sendPhoto,
  setUserPhoto,
  $sendPhotoError,
  $isLoadingPostPhoto,
  setSendPhotoError,
  $addReviewError,
  clearAddReviewErr,
  $sendPhotoErrorNew,
  clearSendPhotoErrorNew,
};
