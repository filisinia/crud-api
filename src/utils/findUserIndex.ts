import { ServerResponse } from "node:http";
import { ServerErrors } from "types";
import { sendJsonResponse } from "utils";
import users from "./users";

export const findUserIndex = (
  res: ServerResponse,
  userId: string
): number | void => {
  if (!userId) {
    return sendJsonResponse(res, 400, {
      message: ServerErrors.INVALID_USER_ID,
    });
  }

  const userIndex = users.findIndex(({ id }) => id === userId);

  if (userIndex === -1) {
    return sendJsonResponse(res, 404, { message: ServerErrors.USER_NOT_FOUND });
  }

  return userIndex;
};
