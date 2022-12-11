import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { DataStore, Query } from '../../../core/infrastructure/DataStore';
import { Repository } from '../../../core/infrastructure/Repository';
import { PieStore } from '../domain/PieStore';
import { PieStoreId } from '../domain/PieStoreId';
import { PieStoreMap } from '../mappers/PieStoreMap';

export interface IPieStoreRepository extends Repository<PieStore> {
  getPieStoreById(pieStoreId: PieStoreId): Promise<PieStore>;
}

export class PieStoreRepository implements IPieStoreRepository {
  private dataStore: DataStore;

  constructor(dataStore: DataStore) {
    this.dataStore = dataStore;
  }

  public async getPieStoreById(pieStoreId: PieStoreId): Promise<PieStore> {
    const pieStoreByIdQuery = this.createPieStoreQuery(pieStoreId);
    const pieStoreRecord = await this.dataStore.findByName(pieStoreByIdQuery);
    if (!pieStoreRecord) {
      throw new Error(
        `PieStoreId: [${pieStoreId.id}] does not exist in the system.`,
      );
    }
    return PieStoreMap.toDomain(pieStoreRecord);
  }

  public async exists(pieStore: PieStore): Promise<boolean> {
    const pieStoreRecord = await this.dataStore.findByName(pieStore);
    return !!pieStoreRecord === true;
  }

  public async save(pieStore: PieStore): Promise<PieStore> {
    const exists = await this.exists(pieStore);
    const rawPieStore = PieStoreMap.toPersistence(pieStore);

    try {
      if (!exists) {
        await this.dataStore.create(rawPieStore);
      } else {
        await this.dataStore.update(rawPieStore);
      }
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        throw new Error(
          `Pie Store: [${pieStore.name}] already exists using slug '${pieStore.pieStoreSlug}'`,
        );
      }
      await this.rollbackSave(pieStore);
    }
    return pieStore;
  }

  private async rollbackSave(pieStore: PieStore) {
    await this.dataStore.destroy({
      where: {
        id: pieStore.id,
      },
    });
  }

  private createPieStoreQuery(pieStoreId: PieStoreId): Query {
    return {
      where: {
        id: pieStoreId.id,
      },
    };
  }
}
