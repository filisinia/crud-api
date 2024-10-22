import http from "http";
import url from "url";
import dotenv from "dotenv";
import { sendJsonResponse } from "./utils/sendJson.js";
import { getUsers } from "./userOperations/getUsers.js";
import { getUserById } from "./userOperations/getUserById.js";
import { createUser } from "./userOperations/createUser.js";
import { updateUser } from "./userOperations/updateUser.js";
import { deleteUser } from "./userOperations/deleteUser.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (!req.url) {
    sendJsonResponse(res, 400, { message: "Bad Request" });
    return;
  }

  const { pathname } = url.parse(req.url, true);
  const userId = pathname?.split("/")[3];

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    switch (req.method) {
      case "GET":
        if (pathname === "/api/users") {
          getUsers(res);
        } else if (pathname?.startsWith("/api/users/") && userId) {
          getUserById(res, userId);
        } else {
          sendJsonResponse(res, 404, { message: "Not Found" });
        }
        break;

      case "POST":
        if (pathname === "/api/users") {
          createUser(res, body);
        } else {
          sendJsonResponse(res, 404, { message: "Not Found" });
        }
        break;

      case "PUT":
        if (pathname?.startsWith("/api/users/") && userId) {
          updateUser(res, userId, JSON.parse(body));
        } else {
          sendJsonResponse(res, 404, { message: "Not Found" });
        }
        break;

      case "DELETE":
        if (pathname?.startsWith("/api/users/") && userId) {
          deleteUser(res, userId);
        } else {
          sendJsonResponse(res, 404, { message: "Not Found" });
        }
        break;

      default:
        sendJsonResponse(res, 405, { message: "Method Not Allowed" });
        break;
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
