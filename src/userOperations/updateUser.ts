import { ServerResponse } from "node:http";
import { UserType } from "types/user";
import { sendJsonResponse } from "utils/sendJson";
import users from "utils/users";

export const updateUser = (
  res: ServerResponse,
  userId: string,
  body: Partial<Omit<UserType, "id">>
) => {
  if (!userId) {
    return sendJsonResponse(res, 400, { message: "Invalid userId" });
  }

  const userIndex = users.findIndex(({ id }) => id === userId);

  if (userIndex === -1) {
    return sendJsonResponse(res, 404, { message: "User not found" });
  }

  const updatedUser = { ...users[userIndex], ...body } as UserType;

  users[userIndex] = updatedUser;
  sendJsonResponse(res, 200, users[userIndex]);
};
