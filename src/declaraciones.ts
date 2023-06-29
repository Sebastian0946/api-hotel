export type Query = Record<string, any>;

export type id = string | number;

export interface DatabaseRepository<T> {
    create(data: Partial<T>, query?: Query): Promise<T>;
    list(query?: Query): Promise<T[]>;
    get(id: id, query?: Query): Promise<T>;
    update(id: id, data: T, query?: Query): Promise<T>;
    remove(id: id, query?: Query): Promise<T>;
}
  