interface FindParams {
  itemId?: number;
}

interface IBaseRepositoryConstructor {
  file: string;
}
interface IBaseRepository {
  find(itemId: FindParams): Promise<any>;
}

export { IBaseRepository, IBaseRepositoryConstructor, FindParams };
