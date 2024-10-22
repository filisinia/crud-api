import http from "http";
import url from "url";
import dotenv from "dotenv";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "userOperations";
import { sendJsonResponse } from "utils";
import { ServerErrors } from "types/serverErrors";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (!req.url) {
    sendJsonResponse(res, 400, { message: ServerErrors.BAD_REQUEST });
    return;
  }

  const { pathname } = url.parse(req.url, true);
  const userId = pathname?.split("/")[3];
  const isPathCorrect = pathname?.startsWith("/api/users/");

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    switch (req.method) {
      case "GET":
        if (pathname === "/api/users") {
          getUsers(res);
        } else if (isPathCorrect && userId) {
          getUserById(res, userId);
        }

        break;

      case "POST":
        pathname === "/api/users" && createUser(res, body);
        break;

      case "PUT":
        isPathCorrect && userId && updateUser(res, userId, JSON.parse(body));
        break;

      case "DELETE":
        isPathCorrect && userId && deleteUser(res, userId);
        break;

      default:
        sendJsonResponse(res, 405, {
          message: ServerErrors.METHOD_NOT_ALLOWED,
        });
        break;
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
