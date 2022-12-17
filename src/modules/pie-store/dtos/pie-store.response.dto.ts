import { ResponseBase } from '../../../libs/api/response.base';
import { Address } from '../domain/value-objects/address.value-object';

export class PieStoreResponseDto extends ResponseBase {
  pieStoreSlug!: string;

  storeName!: string;

  storeAddress!: Address;
}