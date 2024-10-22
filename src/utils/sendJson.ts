import { ServerResponse } from "node:http";

export const sendJsonResponse = (
  res: ServerResponse,
  statusCode: number,
  data: object
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
