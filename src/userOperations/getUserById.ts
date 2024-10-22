import { ServerResponse } from "node:http";
import { findUserIndex, sendJsonResponse } from "utils";
import users from "utils/users";

export const getUserById = (res: ServerResponse, userId: string) => {
  const userIndex = findUserIndex(res, userId);
  const user = userIndex ? users[userIndex] : null;

  user && sendJsonResponse(res, 200, user);
};
