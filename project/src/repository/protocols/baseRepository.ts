export interface IBaseRepository {
  file: any;
  find?({ itemId }: { itemId?: number }): Promise<any>;
}
