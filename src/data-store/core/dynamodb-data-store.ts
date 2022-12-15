import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DataStore } from '../../core/infrastructure/DataStore';
import { getClient } from './dynamodb-client';

export abstract class DynamoDbDataStore implements DataStore {
  protected dynamoDbClient: DynamoDBClient;

  constructor() {
    this.dynamoDbClient = getClient();
  }

  abstract create(rawData: any): Promise<void>;
  abstract update(rawData: any): Promise<void> ;
  abstract destroy(rawData: any): Promise<void> ;
  abstract findById(rawData: any): Promise<boolean | Record<string, any>>;
  abstract findByName(rawData: any): Promise<boolean | Record<string, any>>;
  abstract find(): Promise<Record<string, any>[]>;
}