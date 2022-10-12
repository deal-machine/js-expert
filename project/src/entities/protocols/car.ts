import { IBase } from "./base";

export interface ICar extends IBase {
  releaseYear: number;
  available: boolean;
  gasAvailable: boolean;
}
