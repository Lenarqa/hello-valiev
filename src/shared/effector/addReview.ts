import { IReviewPost, IPostImg } from "./../models/models";

import {
  sample,
  createStore,
  createEffect,
  forward,
  createEvent,
  restore,
} from "effector";

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

const sendPhoto = createEvent<string>();
const sendPhotoFx = createEffect(async (id: string) => {
  console.log("----------------------------");
  console.log("sendPhotoFx ");

  const curPhoto = $cutUserPhoto.getState();
  const formData = new FormData();
  if(curPhoto){
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
      console.log(response);
      return response;
  }
});

forward({
  from: sendPhoto,
  to: sendPhotoFx,
});

// set user Photo
const setUserPhoto = createEvent<File | null>();
const $cutUserPhoto = createStore<File | null>(null).on(
  setUserPhoto,
  (_, state) => state
);

const $sendPhotoGood = createStore<string>("Hello boys");

const sayHello = createEffect((text: string) => {
  console.log(text);
  console.log($cutUserPhoto.getState());
});

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
};
