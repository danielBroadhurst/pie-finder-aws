import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { Option } from 'oxide.ts/dist';
import {
  AggregateRoot,
  Mapper,
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '../../../domain';
import { LoggerPort } from '../../../ports/logger.port';
import { EventClient } from '../../event-client/event-client';
import { Item } from './base';
import { getDatabaseClient } from './dynamodb-client';

export abstract class DynamoDbDataStore<Aggregate extends AggregateRoot<any>, DbModel extends Item>
implements RepositoryPort<Aggregate> {

  protected abstract tableName: string;

  protected constructor(
    private readonly _client: DynamoDBClient,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventClient: EventClient,
    protected readonly logger: LoggerPort,
  ) {}

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    try {
      const entities = Array.isArray(entity) ? entity : [entity];

      const records = entities.map(this.mapper.toPersistence);

      const putItemCommands = this.generatePutItemCommands(records);

      for (const command of putItemCommands) {
        await this.client.send(command);
      }
    } catch (error) {
      throw error;
    }
  }

  generatePutItemCommands(records: DbModel[]) {
    return records.map((record) => new PutItemCommand({
      TableName: this.tableName,
      Item: record.toItem(),
    }));
  }

  abstract findOneById(id: string): Promise<Option<Aggregate>>;
  abstract findAll(): Promise<Aggregate[]>;
  abstract findAllPaginated(
    params: PaginatedQueryParams
  ): Promise<Paginated<Aggregate>>;
  abstract delete(pieStore: Aggregate): Promise<boolean>;

  abstract transaction<T>(handler: () => Promise<T>): Promise<T>;

  /**
   * Get database client.
   * If global request transaction is started,
   * returns a transaction pool.
   */
  protected get client(): DynamoDBClient {
    return (this._client ?? getDatabaseClient());
  }
}
