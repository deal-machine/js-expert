const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

const BASE_URL = "https://api.adviceslip.com/advice";
const mock = {
  advice: require("../mocks/response.json"),
};

(async () => {
  const service = new Service();
  const serviceStub = sinon.stub(service, "makeRequest");
  serviceStub.withArgs(BASE_URL).resolves(mock.advice);
  {
    const result = await service.getAdvice(BASE_URL);
    const expect = {
      advice: "Do not compare yourself with others.",
    };
    deepStrictEqual(result, expect);
  }
})();
