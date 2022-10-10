const { describe, it } = require("mocha");
const request = require("supertest");
const { deepStrictEqual } = require("assert");
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
});
