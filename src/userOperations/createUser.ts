import { ServerResponse } from "node:http";
import { sendJsonResponse } from "utils/sendJson";
import users from "utils/users";
import { randomUUID } from "crypto"; 

export const createUser = (res: ServerResponse, body: string) => {
  const { name, age } = JSON.parse(body);

  if (!name || !age) {
    return sendJsonResponse(res, 400, { message: "Missing required fields" });
  }

  const newUser = { id: randomUUID(), name, age };
  users.push(newUser);
  sendJsonResponse(res, 201, newUser);
};
