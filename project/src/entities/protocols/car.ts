import { IBase } from "./base";

export interface ICar extends IBase {
  releaseYear: string;
  available: boolean;
  gasAvailable: boolean;
}
