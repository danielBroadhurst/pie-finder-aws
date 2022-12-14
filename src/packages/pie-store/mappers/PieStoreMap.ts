import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { PieStore } from '../domain/PieStore';
import { StoreAddress } from '../domain/StoreAddress';
import { StoreName } from '../domain/StoreName';

export class PieStoreMap {
  static toPersistence(pieStore: PieStore): any {
    return {
      id: pieStore.pieStoreId.id.toValue(),
      pieStoreSlug: pieStore.pieStoreSlug,
      storeAddress: pieStore.storeAddress?.value,
      storeName: pieStore.storeName?.value,
      dateAdded: pieStore.dateAdded,
    };
  }
  public static toDomain(raw: any): PieStore {
    const pieStoreOrError = PieStore.create(
      {
        ...raw,
        ...(raw.storeName && {
          storeName: StoreName.create(raw.storeName).getValue(),
        }),
        ...(raw.storeAddress && {
          storeAddress: StoreAddress.create(raw.storeAddress).getValue(),
        }),
      },
      new UniqueEntityID(raw.id),
    );

    if (pieStoreOrError.isFailure) {
      throw new Error(pieStoreOrError.errorValue());
    }

    return pieStoreOrError.getValue();
  }
}
