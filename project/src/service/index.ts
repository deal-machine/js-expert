import { CarService } from "./carService";
import { BaseRepository } from "../repository/baseRepository";

const baseRepository = new BaseRepository({ file: "" });
const carService = new CarService({ baseRepo: baseRepository });

export { carService };
