import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Item } from '../../../../libs/application/db/dynamo-db/base';
import { PieStoreModel } from '../pie-store.repository';

export class PieStoreItem extends Item {
  static fromItem(
    item: Record<string, AttributeValue> | undefined,
  ): PieStoreItem {
    if (!item) {
      throw new Error('No item found!');
    }
    const performanceRawData = unmarshall(item) as unknown as PieStoreModel;
    return new PieStoreItem(performanceRawData);
  }

  pieStore: PieStoreModel;

  constructor(pieStore: PieStoreModel) {
    super();
    this.pieStore = pieStore;
  }

  get pk(): string {
    return `PIESTORE#${this.pieStore.pieStoreSlug.toUpperCase()}`;
  }

  get sk(): string {
    return `PIESTORE#${this.pieStore.pieStoreSlug.toUpperCase()}`;
  }

  toItem(): Record<string, AttributeValue> {
    return marshall({
      ...this.keys(),
      ...this.pieStore,
    }, { convertClassInstanceToMap: true });
  }
}
