export interface IBaseService<T> {
  findAll(): Promise<T[]>;
  get(id: object): Promise<T>;
  save(entity: T): Promise<any>;
  delete(id: string);
  deleteAll();
  multiSave(entity: any[]): Promise<any[]>;
}
