import { createEffect, forward, createEvent, restore, sample } from "effector";
import { sortByDate } from "../lib/index";
import { IChangeReviewText, IReview, IOption } from "../../../shared/models/models";
import { changeReviewStatusHandler, changeReviewTextHandler, getReviewsHandler } from "../api";

// get reviews
const getUserReviews = createEvent<IReview[]>();

const getUserReviewsFx = createEffect(getReviewsHandler);

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

const changeReviewTextFx = createEffect(changeReviewTextHandler);

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
const changeReviewStatusFx = createEffect(changeReviewStatusHandler);

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
  $changeReviewStatusRes,
};
