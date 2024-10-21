import users from "../utils/users.json";

export const getUsers = (res) => {
  sendJsonResponse(res, 200, users);
};
