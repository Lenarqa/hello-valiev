import { IParticipant, IOption } from "../../../shared/models/models";
import { serializeUsers } from "../lib/index";
import {
  createEffect,
  forward,
  createEvent,
  restore,
  sample,
  createStore,
} from "effector";
import { getUsersHandler } from "../api";

// get users
const getUsers = createEvent<IParticipant[]>();

const getUsersFx = createEffect(getUsersHandler);

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
