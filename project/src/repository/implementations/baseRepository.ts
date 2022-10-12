import { readFile } from "fs/promises";
import {
  IBaseRepository,
  IBaseRepositoryConstructor,
} from "../protocols/baseRepository";

class BaseRepository implements IBaseRepository {
  file: any;
  constructor({ file }: IBaseRepositoryConstructor) {
    this.file = file;
  }

  async find({ itemId }: { itemId?: number }) {
    const fileRead = (await readFile(this.file)).toString();
    const content = JSON.parse(fileRead);

    if (!itemId) {
      return content;
    }
    return content.find(({ id }: { id: number }) => id === itemId);
  }
}

export { BaseRepository };
