import { createEffect, forward, createEvent, restore } from "effector";

// в процессе
const getUsers = createEvent();

const getUsersFx = createEffect(async () => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = await fetch(
      "https://academtest.ilink.dev/user/getAll",
      {
        method: "GET",
        headers: { authorization: "Bearer " + localTokenObj.accessToken },
      }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response));
      console.log(response);
    //   return serializeReview(response);
  }
});

forward({
  from: getUsers,
  to: getUsersFx,
});

const $users = restore(getUsers, null);

const $isLoadingUsers = getUsersFx.pending;

export const usersStore = {
  getUsers,
  $users,
  $isLoadingUsers,
};
