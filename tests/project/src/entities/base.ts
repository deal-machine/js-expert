import { IBase } from "./protocols";

class Base implements IBase {
  id: number;
  name: string;

  constructor({ id, name }: IBase) {
    this.id = id;
    this.name = name;
  }
}

export { Base };
