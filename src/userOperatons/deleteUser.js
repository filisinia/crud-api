import users from "../utils/users.json";

export const handleDeleteUser = (res, userId) => {
  if (!userId || !uuidv4.validate(userId)) {
    return sendJsonResponse(res, 400, { message: "Invalid userId" });
  }
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return sendJsonResponse(res, 404, { message: "User not found" });
  }
  users.splice(userIndex, 1);
  sendJsonResponse(res, 204, {});
};
