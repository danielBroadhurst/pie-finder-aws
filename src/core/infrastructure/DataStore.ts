import { UniqueEntityID } from '../domain/UniqueEntityId';

export interface Query {
  where: {
    id: UniqueEntityID;
  };
}

export interface DataStore {
  find(): Promise<Record<string, any>[]>;
  destroy(rawData: any): Promise<void>;
  update(rawData: any): Promise<void>;
  create(rawData: any): Promise<void>;
  findById(rawData: any): Promise<boolean | Record<string, any>>;
  findByName(rawData: any): Promise<boolean | Record<string, any>>;
}
