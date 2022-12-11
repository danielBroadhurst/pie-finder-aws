import { DeleteItemCommand, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDbDataStore } from '../../../data-store/core/dynamodb-data-store';
import { PieStore } from '../domain/PieStore';
import { PieStoreItem } from './ddb-pie-store-item';

const TABLE_NAME = process.env.TABLE_NAME || 'PieFinderDB';

export class PieStoreDynamoDb extends DynamoDbDataStore {

  public async create(pieStore: PieStore): Promise<void> {
    try {
      const pieStoreItem = new PieStoreItem(pieStore);
      await this.dynamoDbClient.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: pieStoreItem.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }));
    } catch (error) {
      throw error;
    }
  }

  public async update(pieStore: PieStore): Promise<void> {
    try {
      const pieStoreItem = new PieStoreItem(pieStore);
      await this.dynamoDbClient.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: pieStoreItem.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }));
    } catch (error) {
      throw error;
    }
  }

  public async destroy(pieStore: PieStore): Promise<void> {
    try {
      const pieStoreItem = new PieStoreItem(pieStore);
      await this.dynamoDbClient.send(new DeleteItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({
          ...pieStoreItem.keys(),
        }),
      }));
    } catch (error) {
      throw error;
    }
  }

  public findById(rawData: any): Promise<boolean> {
    console.info(rawData);
    throw new Error('Please use find by name');
  }

  public async findByName(pieStore: PieStore): Promise<Record<string, any>> {
    try {
      const pieStoreItem = new PieStoreItem(pieStore);
      const data = await this.dynamoDbClient.send(new GetItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({
          ...pieStoreItem.keys(),
        }),
      }));
      return data;
    } catch (error) {
      throw error;
    }
  }
}