import { ServerResponse } from "node:http";
import { sendJsonResponse } from "utils/sendJson";
import users from "utils/users";

export const getUsers = (res: ServerResponse) => {
  sendJsonResponse(res, 200, users);
};
