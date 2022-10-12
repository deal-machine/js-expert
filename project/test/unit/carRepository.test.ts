import { join } from "path";
import { BaseRepository } from "../../src/repository/implementations/baseRepository";

const makeSut = () => {
  const filename = join(__dirname, "../../src/infra/database", "cars.json");
  return { carRepository: new BaseRepository({ file: filename }) };
};

describe("Car Repository", () => {
  it("should find with item id", async () => {
    const { carRepository } = makeSut();
    const findCall = jest.spyOn(carRepository, "find");
    const cars = await carRepository.find({ itemId: 10 });

    expect(findCall).toBeCalledWith({ itemId: 10 });
    expect(cars).toBeFalsy();
  });

  it("should find without item id", async () => {
    const { carRepository } = makeSut();
    const cars = await carRepository.find({});

    expect(cars).toBeTruthy();
    expect(cars).toHaveLength(2);
  });
});
