import { DeleteItemCommand, GetItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDbDataStore } from '../../../../data-store/core/dynamodb-data-store';
import { Review } from '../../domain/Review';
import { ReviewItem } from './ddb-review-item';

const TABLE_NAME = process.env.TABLE_NAME || 'PieFinderDB';

export class ReviewDynamoDB extends DynamoDbDataStore {

  public async create(review: Review): Promise<void> {
    try {
      const reviewItem = new ReviewItem(review);
      await this.dynamoDbClient.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: reviewItem.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }));
    } catch (error) {
      throw error;
    }
  }

  public async update(review: Review): Promise<void> {
    try {
      const reviewItem = new ReviewItem(review);
      await this.dynamoDbClient.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: reviewItem.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }));
    } catch (error) {
      throw error;
    }
  }

  public async destroy(review: Review): Promise<void> {
    try {
      const reviewItem = new ReviewItem(review);
      await this.dynamoDbClient.send(new DeleteItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({
          ...reviewItem.keys(),
        }),
      }));
    } catch (error) {
      throw error;
    }
  }

  public async findById(review: Review): Promise<boolean | Record<string, any>> {
    try {
      const reviewItem = new ReviewItem(review);
      const data = await this.dynamoDbClient.send(new GetItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({
          ...reviewItem.keys(),
        }),
      }));
      return data.Item ? unmarshall(data.Item) : false;
    } catch (error) {
      throw error;
    }
  }

  public async find(): Promise<Record<string, any>[]> {
    try {
      const data = await this.dynamoDbClient.send(new ScanCommand({
        TableName: TABLE_NAME,
      }));
      if (!data.Items) {
        throw new Error('No Pie Stores found.');
      }
      return data.Items.map(item => unmarshall(item));
    } catch (error) {
      throw error;
    }
  }

  public async findByName(review: Review): Promise<Record<string, any>> {
    console.log(review);
    throw new Error('Not implemented');
  }
}