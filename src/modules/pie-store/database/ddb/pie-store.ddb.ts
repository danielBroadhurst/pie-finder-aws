import { AttributeValue, DeleteItemCommand, GetItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Option } from 'oxide.ts/dist';
import { PaginatedQueryParams, Paginated } from '../../../../libs/domain';
import { PieStoreEntity } from '../../domain/pie-store.entity';
import { PieStoreRepositoryPort } from '../pie-store.repository.port';
import { PieStoreItem } from './pie-store.ddb.item';

const TABLE_NAME = process.env.TABLE_NAME || 'PieFinderDB';

export class PieStoreDynamoDb implements PieStoreRepositoryPort {

  public async insert(pieStore: PieStoreEntity): Promise<void> {
    console.log(pieStore);
  }

  public async delete(pieStore: PieStoreEntity): Promise<boolean> {
    try {
      const pieStoreItem = new PieStoreItem(pieStore);
      await this.dynamoDbClient.send(new DeleteItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({
          ...pieStoreItem.keys(),
        }),
      }));
      return true;
    } catch (error) {
      throw error;
    }
  }

  public findOneById(id: string): Promise<Option<PieStoreEntity>> {
    console.info(id);
    throw new Error('Please use find by name');
  }

  public async findAll(): Promise<PieStoreEntity[]> {
    try {
      const data = await this.dynamoDbClient.send(new ScanCommand({
        TableName: TABLE_NAME,
      }));
      if (!data.Items) {
        throw new Error('No Pie Stores found.');
      }
      return data.Items.map((item: Record<string, AttributeValue>) => unmarshall(item));
    } catch (error) {
      throw error;
    }
  }

  public async findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<PieStoreEntity>> {
    console.info(params);
    throw new Error('Please use find by name');
  }

  public async findOneBySlug(pieStoreSlug: string): Promise<PieStoreEntity | null> {
    try {
      const pieStoreItem = new PieStoreItem({ pieStoreSlug });
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