import { ServerResponse } from "node:http";
import { sendJsonResponse } from "utils/sendJson";
import users from "utils/users";

export const deleteUser = (res: ServerResponse, userId: string) => {
  if (!userId) {
    return sendJsonResponse(res, 400, { message: "Invalid userId" });
  }

  const userIndex = users.findIndex(({ id }) => id === userId);

  if (userIndex === -1) {
    return sendJsonResponse(res, 404, { message: "User not found" });
  }

  users.splice(userIndex, 1);
  sendJsonResponse(res, 204, {});
};
