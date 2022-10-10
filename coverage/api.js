const http = require("http");

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  default: (request, response) => {
    response.write("Hello world!");
    return response.end();
  },
};

const handler = function async(request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  const routeChosen = routes[routeKey] || routes.default;

  response.writeHead(200, {
    "Content-Type": "html/text",
  });

  return routeChosen(request, response);
};
const port = 3000;
const app = http.createServer(handler);

module.exports = app;
