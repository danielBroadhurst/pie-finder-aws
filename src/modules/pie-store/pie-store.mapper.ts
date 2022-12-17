import { Mapper } from '../../libs/domain';
import { PieStoreItem } from './database/ddb/pie-store.ddb.item';
import { PieStoreEntity } from './domain/pie-store.entity';
import { Address } from './domain/value-objects/address.value-object';
import { PieStoreResponseDto } from './dtos/pie-store.response.dto';

export class PieStoreMapper implements Mapper<PieStoreEntity, PieStoreItem, PieStoreResponseDto> {
  toPersistence(entity: PieStoreEntity): PieStoreItem {
    return new PieStoreItem({
      id: entity.id,
      pieStoreSlug: entity.pieStoreSlug,
      storeAddress: entity.storeAddress.unpack(),
      storeName: entity.storeName,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  toDomain(record: any): PieStoreEntity {
    const entity = new PieStoreEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        pieStoreSlug: record.pieStoreSlug,
        storeName: record.storeName,
        storeAddress: new Address({
          street: record.storeAddress.street,
          country: record.storeAddress.country,
          postalCode: record.storeAddress.postalCode,
        }),
      },
    });
    return entity;
  }

  toResponse(entity: PieStoreEntity): PieStoreResponseDto {
    const props = entity.getPropsCopy();
    const response = new PieStoreResponseDto(entity);
    response.pieStoreSlug = props.pieStoreSlug;
    response.storeName = props.storeName;
    response.storeAddress = props.storeAddress;
    return response;
  }
}
