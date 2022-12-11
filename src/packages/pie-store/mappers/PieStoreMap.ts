import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { PieStore } from '../domain/PieStore';

export class PieStoreMap {
  static toPersistence(pieStore: PieStore): any {
    return {
      id: pieStore.pieStoreId.id.toValue(),
      pieStoreSlug: pieStore.pieStoreSlug,
      name: pieStore.name,
      dateAdded: pieStore.dateAdded,
    };
  }
  public static toDomain(raw: any): PieStore {
    const pieStoreOrError = PieStore.create({
      ...raw,
    }, new UniqueEntityID(raw.id));

    if (pieStoreOrError.isFailure) {
      throw new Error(pieStoreOrError.errorValue());
    }

    return pieStoreOrError.getValue();
  }
}