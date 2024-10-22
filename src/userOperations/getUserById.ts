import { ServerResponse } from "node:http";
import { sendJsonResponse } from "utils/sendJson";
import users from "utils/users";

export const getUserById = (res: ServerResponse, userId: string) => {
  if (!userId) {
    return sendJsonResponse(res, 400, { message: "Invalid userId" });
  }

  const user = users.find(({ id }) => id === userId);

  if (!user) {
    return sendJsonResponse(res, 404, { message: "User not found" });
  }

  sendJsonResponse(res, 200, user);
};
