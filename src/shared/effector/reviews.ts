import { IReview } from '../models/models';
import { serializeReview } from './../serializers/serializeReview';
import { createEffect, forward, createEvent, restore } from "effector";

const getUserReviews = createEvent<string>();

const getUserReviewsFx = createEffect(async (token: string) => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = await fetch(
      "https://academtest.ilink.dev/reviews/getAll",
      {
        method: "GET",
        headers: { authorization: "Bearer " + localTokenObj.accessToken },
      }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response));

      return serializeReview(response);
  }
});

forward({
  from: getUserReviews,
  to: getUserReviewsFx,
});

const $userReviews = restore(getUserReviewsFx, []);

const $isLoadingReviews = getUserReviewsFx.pending;

export const userRevievsStore = {
  getUserReviews,
  $userReviews,
  $isLoadingReviews,
};
