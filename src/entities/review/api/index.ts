import { serializeReview } from "../lib";
import { IChangeReviewText } from "../../../shared/models/models";

export const getReviewsHandler = async () => {
  const localToken = localStorage.getItem("auth");
  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = await fetch(
      "https://academtest.ilink.dev/reviews/getAll",
      {
        method: "GET",
        headers: { authorization: "Bearer " + localTokenObj.accessToken },
      }
    );
    const text = await response.text();
    const data = await JSON.parse(text);
    return serializeReview(data);
  }
};

export const changeReviewTextHandler = (reviewData: IChangeReviewText) => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = fetch(
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
};

export const changeReviewStatusHandler = (reviewData: IChangeReviewText) => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = fetch(
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
};
