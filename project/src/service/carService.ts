import { IBaseRepository } from "../repository/protocols/baseRepository";
import { ICarService } from "./protocols/carService";

class CarService implements ICarService {
  baseRepository: IBaseRepository;
  constructor({ baseRepo }: { baseRepo: any }) {
    this.baseRepository = baseRepo;
  }
}

export { CarService };
