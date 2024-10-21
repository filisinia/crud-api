import users from "../utils/users.json";

export const updateUser = (res, userId, body) => {
  if (!userId || !uuidv4.validate(userId)) {
    return sendJsonResponse(res, 400, { message: "Invalid userId" });
  }
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return sendJsonResponse(res, 404, { message: "User not found" });
  }
  const { username, age, hobbies } = JSON.parse(body);
  users[userIndex] = { ...users[userIndex], username, age, hobbies };
  sendJsonResponse(res, 200, users[userIndex]);
};
