import { ServerResponse } from "node:http";
import { findUserIndex, sendJsonResponse } from "utils";
import users from "utils/users";

export const deleteUser = (res: ServerResponse, userId: string) => {
  const userIndex = findUserIndex(res, userId);

  if (!userIndex) return;

  users.splice(userIndex, 1);
  sendJsonResponse(res, 204, {});
};
