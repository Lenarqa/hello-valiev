import { serializeUsers } from "../lib";

export const getUsersHandler = async () => {
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
};
