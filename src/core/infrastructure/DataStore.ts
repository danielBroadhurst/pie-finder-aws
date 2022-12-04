import { UniqueEntityID } from '../domain/UniqueEntityId';

export interface Query {
  where: {
    id: UniqueEntityID;
  };
}

export interface DataStore {
  destroy(query: Query): Promise<void>;
  update(rawData: any): Promise<void>;
  create(rawData: any): Promise<void>;
  findById(query: Query): Promise<Record<string, any>> | Promise<boolean>;
}
