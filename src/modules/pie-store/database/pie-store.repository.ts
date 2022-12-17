import { AttributeValue, DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Option } from 'oxide.ts/dist';
import { getDatabaseClient } from '../../../libs/application/db/dynamo-db/dynamodb-client';
import { DynamoDbDataStore } from '../../../libs/application/db/dynamo-db/dynamodb-data-store';
import { EventClient } from '../../../libs/application/event-client/event-client';
import { Logger } from '../../../libs/application/utils/logger/logger.service';
import { PaginatedQueryParams, Paginated } from '../../../libs/domain';
import { PieStoreEntity } from '../domain/pie-store.entity';
import { AddressProps } from '../domain/value-objects/address.value-object';
import { PieStoreMapper } from '../pie-store.mapper';
import { PieStoreItem } from './ddb/pie-store.ddb.item';
import { PieStoreRepositoryPort } from './pie-store.repository.port';

export type PieStoreModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pieStoreSlug: string;
  storeAddress: AddressProps;
  storeName: string;
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

  findOneBySlug(pieStoreSlug: string): Promise<PieStoreEntity | null> {
    console.log(pieStoreSlug);
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<Option<PieStoreEntity>> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<PieStoreEntity[]> {
    throw new Error('Method not implemented.');
  }
  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<PieStoreEntity>> {
    try {
      console.log(params);
      const data = await this.client.send(new ScanCommand({
        TableName: TABLE_NAME,
      }));
      if (!data.Items) {
        throw new Error('No Pie Stores found.');
      }
      const results = data.Items.map((item: Record<string, AttributeValue>) => unmarshall(item));
      return new Paginated({
        data: results.map(result => this.mapper.toResponse(this.mapper.toDomain(result))),
        count: results.length,
        limit: 5,
        page: 1,
      });
    } catch (error) {
      throw error;
    }
  }
  delete(pieStore: PieStoreEntity): Promise<boolean> {
    console.log(pieStore);
    throw new Error('Method not implemented.');
  }
  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return handler();
  }
}
