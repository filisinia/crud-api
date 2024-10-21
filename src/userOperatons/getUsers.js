export const handleGetUsers = (res) => {
  sendJsonResponse(res, 200, users);
};
