import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Option } from 'oxide.ts/dist';
import { getDatabaseClient } from '../../../libs/application/db/dynamo-db/dynamodb-client';
import { DynamoDbDataStore } from '../../../libs/application/db/dynamo-db/dynamodb-data-store';
import { EventClient } from '../../../libs/application/event-client/event-client';
import { Logger } from '../../../libs/application/utils/logger/logger.service';
import { PieStoreEntity } from '../domain/pie-store.entity';
import { AddressProps } from '../domain/value-objects/address.value-object';
import { PieStoreMapper } from '../pie-store.mapper';
import { PieStoreItem } from './ddb/pie-store.ddb.item';
import { FindPieStoreParams, PieStoreRepositoryPort } from './pie-store.repository.port';

export type PieStoreModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pieStoreSlug: string;
  storeAddress?: AddressProps;
  storeName?: string;
};

const TABLE_NAME = process.env.TABLE_NAME || 'PieFinderDB';

export class PieStoreRepository
  extends DynamoDbDataStore<PieStoreEntity, PieStoreItem>
  implements PieStoreRepositoryPort {

  protected tableName: string = TABLE_NAME;

  constructor(
    dbClient: DynamoDBClient = getDatabaseClient(),
    mapper: PieStoreMapper = new PieStoreMapper(),
    eventClient: EventClient = new EventClient(),
  ) {
    super(dbClient, mapper, eventClient, new Logger(PieStoreRepository.name));
  }

  async findOneBySlug(params: FindPieStoreParams): Promise<PieStoreModel> {
    try {
      const pieStoreParams = new PieStoreEntity({
        id: '',
        props: {
          pieStoreSlug: params.pieStoreSlug,
        },
      });
      const pieStoreItem = new PieStoreItem(pieStoreParams);
      const data = await this.client.send(new GetItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({
          ...pieStoreItem.keys(),
        }),
      }));
      if (!data.Item) {
        throw new Error('No records found.');
      }
      const rawPieStore = unmarshall(data.Item);
      return this.mapper.toResponse(this.mapper.toDomain(rawPieStore));
    } catch (error) {
      throw error;
    }
  }

  findOneById(id: string): Promise<Option<PieStoreEntity>> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<PieStoreEntity[]> {
    throw new Error('Method not implemented.');
  }

  delete(pieStore: PieStoreEntity): Promise<boolean> {
    console.log(pieStore);
    throw new Error('Method not implemented.');
  }
  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return handler();
  }
}
