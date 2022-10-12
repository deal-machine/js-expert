import { IBase } from "./base";

export interface ICategory extends IBase {
  carIds: number[];
  price: number;
}
