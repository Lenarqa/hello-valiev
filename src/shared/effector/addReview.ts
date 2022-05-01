import { IReviewPost, IPostImg } from "./../models/models";

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

const sendReviewFx = createEffect(async (review: IReviewPost) => {
  console.log(review);
  const response = await fetch("https://academtest.ilink.dev/reviews/create", {
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
    .then((response) => response.text())
    .then((response) => JSON.parse(response));
  return response;
});

forward({
  from: sendReview,
  to: sendReviewFx,
});

const $sendReviewError = restore(sendReviewFx, null);

const setSendReviewError = createEvent();
$sendReviewError.on(setSendReviewError, (_, state) => null);

const $isLoadingAddReview = sendReviewFx.pending;

// sendPhoto
const sendPhoto = createEvent<string>();
const sendPhotoFx = createEffect(async (id: string) => {
  console.log("sendPhotoFx ");
  const curPhoto = $cutUserPhoto.getState();
  if (curPhoto) {
    const formData = new FormData();
    formData.append("authorImage", curPhoto);

    const response = await fetch(
      `https://academtest.ilink.dev/reviews/updatePhoto/${id}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response));
      console.log(response)
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
  source: $sendReviewError,
  fn: (review, _) => review.id,
  target: sendPhotoFx,
});

export const addReviewStore = {
  $sendReviewError,
  sendReview,
  $isLoadingAddReview,
  setSendReviewError,
  sendPhoto,
  setUserPhoto,
  $sendPhotoError,
  $isLoadingPostPhoto,
  setSendPhotoError,
};
