import { Base } from "./base";
import { ICategory } from "./protocols";

class Category extends Base {
  carIds: number[];
  price: number;

  constructor({ id, name, carIds, price }: ICategory) {
    super({ id, name });
    this.carIds = carIds;
    this.price = price;
  }
}

export { Category };
