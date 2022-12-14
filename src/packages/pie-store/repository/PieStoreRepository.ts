import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { DataStore } from '../../../core/infrastructure/DataStore';
import { Repository } from '../../../core/infrastructure/Repository';
import { PieStore } from '../domain/PieStore';
import { PieStoreMap } from '../mappers/PieStoreMap';

export interface IPieStoreRepository extends Repository<PieStore> {
  getPieStoreBySlug(pieStoreId: string): Promise<PieStore>;
  getPieStores(): Promise<PieStore[]>;
}

export class PieStoreRepository implements IPieStoreRepository {
  private dataStore: DataStore;

  constructor(dataStore: DataStore) {
    this.dataStore = dataStore;
  }

  public async getPieStoreBySlug(pieStoreSlug: string): Promise<PieStore> {
    const pieStoreProps = PieStoreMap.toDomain({ pieStoreSlug });
    const pieStore = PieStore.create(pieStoreProps).getValue();
    const pieStoreRecord = await this.dataStore.findByName(pieStore);
    if (!pieStoreRecord) {
      throw new Error(
        `PieStoreSlug: [${pieStoreSlug}] does not exist in the system.`,
      );
    }
    return PieStoreMap.toDomain(pieStoreRecord);
  }

  public async getPieStores(): Promise<PieStore[]> {
    const pieStores = await this.dataStore.find();
    if (!pieStores) {
      throw new Error(
        'No Pie Stores exist in the system.',
      );
    }
    return pieStores.map(pieStoreRecord => PieStoreMap.toDomain(pieStoreRecord));
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
          `Pie Store: [${pieStore.storeName.value}] already exists using slug '${pieStore.pieStoreSlug}'`,
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
}
