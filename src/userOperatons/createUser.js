import users from "../utils/users.json";

export const createUser = (res, body) => {
  const { username, age, hobbies } = JSON.parse(body);
  if (!username || !age || !Array.isArray(hobbies)) {
    return sendJsonResponse(res, 400, { message: "Missing required fields" });
  }
  const newUser = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  sendJsonResponse(res, 201, newUser);
};
