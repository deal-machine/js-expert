import { join } from "path";
import { BaseRepository } from "../../src/repository/implementations/baseRepository";
import { CarService } from "../../src/service/implementations/carService";
import { ICarService } from "../../src/service/protocols/carService";

const getDatabase = async (filename: string): Promise<string> =>
  join(__dirname, "../../src/infra/database", filename);

let carService: ICarService;
const carServiceStub = (file: string): ICarService => {
  const baseRepository = new BaseRepository({ file });
  return new CarService({ baseRepository });
};
describe("Car Service", () => {
  beforeAll(async () => {
    const carDatabase = await getDatabase("cars.json");
    carService = carServiceStub(carDatabase);
  });

  it("return all available cars from the carCategory", async () => {
    const results = await carService.getAvailableCar();
    expect(results).toBeTruthy();
  });

  it("return an available car by id", async () => {
    const results = await carService.getAvailableCar(378);
    expect(results).toBeTruthy();
  });
});
