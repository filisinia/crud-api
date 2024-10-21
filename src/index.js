import http from "http";
import url from "url";

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const userId = pathname.split("/")[3];
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
