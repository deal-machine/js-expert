import { Base } from "./base";
import { ICustomer } from "./protocols";

class Customer extends Base {
  age: number;
  constructor({ id, name, age }: ICustomer) {
    super({ id, name });
    this.age = age;
  }
}

export { Customer };
