const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

(async () => {
  const fibonacci = new Fibonacci();
  const fibonacciSpy = sinon.spy(fibonacci, "execute");

  {
    const [...results] = fibonacci.execute(5);
    const expectResult = [0, 1, 1, 2, 3];
    deepStrictEqual(results, expectResult);
    const { args } = fibonacciSpy.getCall(2);
    const expectParams = [3, 1, 2];
    deepStrictEqual(args, expectParams);
  }
})();
