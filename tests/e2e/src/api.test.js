const { describe, it } = require("mocha");
const request = require("supertest");
const { deepStrictEqual, ok } = require("assert");
const app = require("./api");

describe("API Suite Test", () => {
  describe("/contact", () => {
    it("should request return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      deepStrictEqual(response.text, "contact us page");
    });
  });
  describe("/hello", () => {
    it("should request return HTTP Status 200", async () => {
      const response = await request(app).get("/").expect(200);

      deepStrictEqual(response.text, "Hello world!");
    });
  });
  describe("/login", () => {
    it("should request return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "deal-machine",
          password: "123",
        })
        .expect(200);

      deepStrictEqual(response.text, "Logging has succeeded");
    });
    it("should request return HTTP Status 401", async () => {
      const { text, unauthorized } = await request(app)
        .post("/login")
        .send({
          username: "different username",
          password: "123",
        })
        .expect(401);

      ok(unauthorized);
      deepStrictEqual(text, "Invalid credentials");
    });
  });
});
