import { CarService } from "./implementations/carService";
import { BaseRepository } from "../repository/implementations/baseRepository";

const baseRepository = new BaseRepository({ file: "" });
const carService = new CarService({ baseRepository });

export { carService };
