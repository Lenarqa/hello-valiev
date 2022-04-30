import { IReviewPost } from './../models/models';

import { createStore,createEffect, forward, createEvent, restore } from "effector";

const sendReview = createEvent<IReviewPost>();

const sendReviewFx = createEffect(async (review:IReviewPost) => {
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
      encodeURIComponent(review.captchaValue)
  })
    .then((response) => response.text())
    .then((response) => JSON.parse(response));
  return response;
});

forward({
  from: sendReview,
  to: sendReviewFx,
});

const $sendReview = restore(sendReviewFx, null);

const $isLoadingAddReview = sendReviewFx.pending;

export const addReviewStore = {
  $sendReview,
  sendReview,
  $isLoadingAddReview,
};
