import { ICar } from "../../entities/protocols";
import { IBaseRepository } from "../../repository/protocols/baseRepository";
import { ICarService, ICarServiceConstructor } from "../protocols/carService";

class CarService implements ICarService {
  baseRepository: IBaseRepository;
  constructor({ baseRepository }: ICarServiceConstructor) {
    this.baseRepository = baseRepository;
  }

  async getAvailableCar(id?: number): Promise<ICar | ICar[]> {
    return this.baseRepository.find({ itemId: id });
  }
}

export { CarService };
