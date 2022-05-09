import { IParticipant, IOption } from "./../models/models";
import { serializeUsers } from "./../serializers/serializeUsers";
import {
  createEffect,
  forward,
  createEvent,
  restore,
  sample,
  createStore,
} from "effector";

// get users
const getUsers = createEvent<IParticipant[]>();

const getUsersFx = createEffect(async () => {
  const localToken = localStorage.getItem("auth");

  if (localToken) {
    const localTokenObj = JSON.parse(localToken);
    const response = await fetch("https://academtest.ilink.dev/user/getAll", {
      method: "GET",
      headers: { authorization: "Bearer " + localTokenObj.accessToken },
    })
      .then((response) => response.text())
      .then((response) => JSON.parse(response));
    return serializeUsers(response);
  }
});

forward({
  from: getUsers,
  to: getUsersFx,
});

const $users = restore(getUsersFx, []);

const $isLoadingUsers = getUsersFx.pending;

const setUsers = createEvent<IParticipant[]>();

$users.on(setUsers, (_, state) => state);
// end get users

// filter Users
const filterUsers = createEvent<IOption>();
const filterUsersFx = createEffect((option: IOption) => {
  const fethingUsers = $users.getState();
  console.log("filterUsers");
  console.log(option);
  console.log(fethingUsers);

  if (option.id !== "all") {
    const filteredItems: IParticipant[] = fethingUsers!.filter(
      (item) => item.status === option.id
    );

    return filteredItems;
  }
  return $users.getState();
});

const $isLoadingFilteredUsers = filterUsersFx.pending;

forward({
  from: filterUsers,
  to: filterUsersFx,
});

const $filteredUsers = restore(filterUsersFx, []);
// end filter Users

// cur page
const $curPage = createStore<number>(1);
const setCurPage = createEvent<number>();

$curPage.on(setCurPage, (state, num) => {
  if(num !== 1000000000 && num !== -1000000000 ) {
    return num;
  }
  if (num === 1000000000) {
    return state + 1;
  } else if (num === -1000000000){
    return state - 1;
  }
});
// end cur page

export const usersStore = {
  getUsers,
  $users,
  $isLoadingUsers,
  filterUsers,
  $filteredUsers,
  $isLoadingFilteredUsers,
  $curPage,
  setCurPage,
};
