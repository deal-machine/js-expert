import { ICar } from "../../entities/protocols";
import { IBaseRepository } from "../../repository/protocols/baseRepository";

export interface ICarService {
  getAvailableCar(id?: number): Promise<ICar | ICar[]>;
}
export interface ICarServiceConstructor {
  baseRepository: IBaseRepository;
}
