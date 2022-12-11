import { UniqueEntityID } from '../domain/UniqueEntityId';

export interface Query {
  where: {
    id: UniqueEntityID;
  };
}

export interface DataStore {
  destroy(rawData: any): Promise<void>;
  update(rawData: any): Promise<void>;
  create(rawData: any): Promise<void>;
  findById(rawData: any): Promise<Record<string, any>> | Promise<boolean>;
  findByName(rawData: any): Promise<Record<string, any>> | Promise<boolean>;
}
