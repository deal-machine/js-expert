import { Base } from "./base";
import { ICar } from "./protocols";

class Car extends Base {
  releaseYear: number;
  available: boolean;
  gasAvailable: boolean;

  constructor({ id, name, releaseYear, available, gasAvailable }: ICar) {
    super({ id, name });
    this.releaseYear = releaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }
}
export { Car };
