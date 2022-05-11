import { sortByDate } from "./../lib/sortReviews/index";
import { IChangeReviewText } from "./../models/models";
import { IReview } from "../models/models";
import { serializeReview } from "./../serializers/serializeReview";
import { createEffect, forward, createEvent, restore, sample } from "effector";
import { IOption } from "./../models/models";

// get reviews
const getUserReviews = createEvent<IReview[]>();
const getUserReviewsFx = createEffect(async () => {
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
      console.log(response);
    return serializeReview(response);
  }
});

forward({
  from: getUserReviews,
  to: getUserReviewsFx,
});

const $userReviews = restore(getUserReviewsFx, []);

const $isLoadingReviews = getUserReviewsFx.pending;

// filter reviews
const filterReviews = createEvent<IOption>();

const filterReviewsFx = createEffect((option: IOption) => {
  const fethingReviews = $userReviews.getState();

  if (option.id !== "all") {
    const filteredItems: IReview[] = fethingReviews!.filter(
      (item) => item.status === option.id
    );

    const sortedFilteredReviews: IReview[] = sortByDate(filteredItems);

    return sortedFilteredReviews;
  }

  const reviews: IReview[] | undefined = $userReviews.getState();

  if (reviews) {
    const sortedReviews: IReview[] = sortByDate(reviews);
    return sortedReviews;
  }
});

const $isLoadingFilteredUsers = filterReviewsFx.pending;
forward({
  from: filterReviews,
  to: filterReviewsFx,
});

const $filteredReviews = restore(filterReviewsFx, []);
// end filter reviews

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
            authorization: `Bearer ${localTokenObj.accessToken}`,
          },
          body: "text=" + encodeURIComponent(reviewData.text),
        }
      )
        .then((response) => response.text())
        .then((response) => JSON.parse(response));
      return response;
    }
  }
);

const $isLoadingReviewChangeText = changeReviewTextFx.pending;

forward({
  from: changeReviewText,
  to: changeReviewTextFx,
});

const $changeTextRes = restore(changeReviewTextFx, {} as IReview);
const clearChangeTextRes = createEvent<IReview>();
$changeTextRes.on(clearChangeTextRes, (_, state) => state);

sample({
  clock: changeReviewTextFx.doneData,
  target: getUserReviews,
});

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
            authorization: `Bearer ${localTokenObj.accessToken}`,
          },
          body: "status=" + encodeURIComponent(reviewData.text),
        }
      )
        .then((response) => response.text())
        .then((response) => JSON.parse(response));
      return response;
    }
  }
);

const $isLoadingReviewChangeStatus = changeReviewStatusFx.pending;
const $changeReviewStatusRes = restore(changeReviewStatusFx, {} as IReview);

forward({
  from: changeReviewStatus,
  to: changeReviewStatusFx,
});

sample({
  clock: changeReviewStatusFx.doneData,
  target: getUserReviews,
});

export const userReviewsStore = {
  getUserReviews,
  $userReviews,
  $isLoadingReviews,
  changeReviewText,
  $isLoadingReviewChangeText,
  changeReviewStatus,
  $isLoadingReviewChangeStatus,
  filterReviews,
  $filteredReviews,
  $isLoadingFilteredUsers,
  $changeTextRes,
  clearChangeTextRes,
  $changeReviewStatusRes
};
