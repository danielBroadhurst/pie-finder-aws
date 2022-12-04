import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { DataStore, Query } from '../../../core/infrastructure/DataStore';
import { ddbDocClient } from './document-client';

export abstract class DynamoDbDataStore implements DataStore {
  private dynamoDbClient: DynamoDBDocumentClient;

  constructor() {
    this.dynamoDbClient = ddbDocClient;
  }

  public async findById(query: Query): Promise<Record<string, any>> {
    try {
      const data = await this.dynamoDbClient.send(new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          pk: query.where.id.toString(),
        },
      }));
      return data;
    } catch (err) {
      console.log('Error', err);
      throw new Error('Oops');
    }
  }
}