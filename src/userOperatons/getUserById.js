import users from "../utils/users.json";

export const getUserById = (res, userId) => {
  if (!userId || !uuidv4.validate(userId)) {
    return sendJsonResponse(res, 400, { message: "Invalid userId" });
  }
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return sendJsonResponse(res, 404, { message: "User not found" });
  }
  sendJsonResponse(res, 200, user);
};
