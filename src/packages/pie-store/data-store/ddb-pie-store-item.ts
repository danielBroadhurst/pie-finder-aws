import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Item } from '../../../data-store/core/base';
import { PieStore } from '../domain/PieStore';

export class PieStoreItem extends Item {
  static fromItem(
    item: Record<string, AttributeValue> | undefined,
  ): PieStoreItem {
    if (!item) {
      throw new Error('No item found!');
    }
    const performanceRawData = unmarshall(item) as unknown as PieStore;
    return new PieStoreItem(performanceRawData);
  }

  pieStore: PieStore;

  constructor(pieStore: PieStore) {
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
    console.log(this.pieStore);

    return marshall({
      ...this.keys(),
      ...this.pieStore,
    }, { convertClassInstanceToMap: true });
  }
}
