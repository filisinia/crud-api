import { ServerResponse } from "node:http";
import { UserType } from "types/user";
import { findUserIndex, sendJsonResponse } from "utils";
import users from "utils/users";

export const updateUser = (
  res: ServerResponse,
  userId: string,
  body: Partial<Omit<UserType, "id">>
) => {
  const userIndex = findUserIndex(res, userId);

  if (!userIndex) return;

  const updatedUser = { ...users[userIndex], ...body } as UserType;

  users[userIndex] = updatedUser;
  sendJsonResponse(res, 200, users[userIndex]);
};
