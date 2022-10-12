interface FindParams {
  itemId?: number;
}

export interface IBaseRepositoryConstructor {
  file: any;
}
export interface IBaseRepository {
  find(itemId: FindParams): Promise<any>;
}
