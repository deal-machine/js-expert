import { join } from "path";
import {
  FindParams,
  IBaseRepository,
  IBaseRepositoryConstructor,
} from "../../src/repository/protocols/baseRepository";
import { CarService } from "../../src/service/implementations/carService";
import { ICarService } from "../../src/service/protocols/carService";
import { validCar } from "../mocks";

const getDatabase = async (filename: string): Promise<string> =>
  join(__dirname, "../../src/infra/database", filename);

const makeBaseRepository = (database: string): IBaseRepository => {
  class BaseRepositoryStub implements IBaseRepository {
    file: string;
    constructor({ file }: IBaseRepositoryConstructor) {
      this.file = file;
    }

    async find({ itemId }: FindParams): Promise<any> {
      if (itemId) validCar.id = itemId;
      return validCar;
    }
  }

  return new BaseRepositoryStub({ file: database });
};
const makeCarService = (baseRepository: IBaseRepository): ICarService => {
  return new CarService({ baseRepository });
};
interface IMakeSut {
  carServiceStub: ICarService;
  baseRepositoryStub: IBaseRepository;
}
const makeSut = (file: string): IMakeSut => {
  const baseRepositoryStub = makeBaseRepository(file);
  const carServiceStub = makeCarService(baseRepositoryStub);
  return {
    carServiceStub,
    baseRepositoryStub,
  };
};

let carDatabase: string;
describe("Car Service", () => {
  beforeAll(async () => {
    carDatabase = await getDatabase("cars.json");
  });

  it("return all available cars from the carCategory", async () => {
    const { carServiceStub, baseRepositoryStub } = makeSut(carDatabase);
    jest
      .spyOn(baseRepositoryStub, "find")
      .mockReturnValueOnce(Promise.resolve(validCar));

    const results = await carServiceStub.getAvailableCar();
    expect(results).toBeTruthy();
  });

  it("return an available car by id", async () => {
    const { carServiceStub, baseRepositoryStub } = makeSut(carDatabase);
    const carId = jest.spyOn(baseRepositoryStub, "find");

    const results = await carServiceStub.getAvailableCar(378);

    expect(carId).toBeCalledWith({ itemId: 378 });
    expect(results).toBeTruthy();
    expect(results).toEqual(validCar);
  });
});
