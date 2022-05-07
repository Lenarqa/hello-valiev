import { IChangeReviewText } from "./../models/models";
import { IReview } from "../models/models";
import { serializeReview } from "./../serializers/serializeReview";
import { createEffect, forward, createEvent, restore, sample } from "effector";

const getUserReviews = createEvent<IReview[]>();

const getUserReviewsFx = createEffect(async () => {  
  const localToken = localStorage.getItem("auth");
  // console.log("getUserReviews")

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

// update review text
const changeReviewText = createEvent<IChangeReviewText>();
const changeReviewTextFx = createEffect(
  async (reviewData: IChangeReviewText) => {
    const localToken = localStorage.getItem("auth");

    if (localToken) {
      const localTokenObj = JSON.parse(localToken);
      const response = await fetch(
        `https://academtest.ilink.dev/reviews/updateInfo/${reviewData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": `Bearer ${localTokenObj.accessToken}`,
          },
          body: "text=" + encodeURIComponent(reviewData.text),
        }
      )
        .then((response) => response.text())
        .then((response) => JSON.parse(response));

      // console.log(response);
      return response;
    }
  }
);

const $isLoadingReviewChangeText = changeReviewTextFx.pending;

forward({
  from: changeReviewText,
  to: changeReviewTextFx,
});

sample({
  clock: changeReviewTextFx.doneData,
  target: getUserReviews,
})

// change status
const changeReviewStatus = createEvent<IChangeReviewText>();
const changeReviewStatusFx = createEffect(
  async (reviewData: IChangeReviewText) => {
    const localToken = localStorage.getItem("auth");

    if (localToken) {
      const localTokenObj = JSON.parse(localToken);
      const response = await fetch(
        `https://academtest.ilink.dev/reviews/updateStatus/${reviewData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": `Bearer ${localTokenObj.accessToken}`,
          },
          body: "status=" + encodeURIComponent(reviewData.text),
        }
      )
        .then((response) => response.text())
        .then((response) => JSON.parse(response));

      console.log(response);
      return response;
    }
  }
)

const $isLoadingReviewChangeStatus = changeReviewStatusFx.pending;

forward({
  from: changeReviewStatus,
  to: changeReviewStatusFx,
});

sample({
  clock: changeReviewStatusFx.doneData,
  target: getUserReviews,
})

export const userRevievsStore = {
  getUserReviews,
  $userReviews,
  $isLoadingReviews,
  changeReviewText,
  $isLoadingReviewChangeText,
  changeReviewStatus,
  $isLoadingReviewChangeStatus,
};
