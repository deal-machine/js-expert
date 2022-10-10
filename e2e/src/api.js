const http = require("http");

const USER = {
  username: "deal-machine",
  password: "123",
};

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);

      if (user.username !== USER.username || user.password !== USER.password) {
        response.writeHead(401);
        response.write("Invalid credentials");
        return response.end();
      }
      response.write("Logging has succeeded");
      return response.end();
    }
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

const app = http.createServer(handler);

module.exports = app;
