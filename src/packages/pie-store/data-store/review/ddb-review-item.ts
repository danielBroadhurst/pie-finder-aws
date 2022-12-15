import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Item } from '../../../../data-store/core/base';
import { Review } from '../../domain/Review';

export class ReviewItem extends Item {
  static fromItem(
    item: Record<string, AttributeValue> | undefined,
  ): ReviewItem {
    if (!item) {
      throw new Error('No item found!');
    }
    const reviewRawItem = unmarshall(item) as unknown as Review;
    return new ReviewItem(reviewRawItem);
  }

  review: Review;

  constructor(review: Review) {
    super();
    this.review = review;
  }

  get pk(): string {
    return `PIESTORE#${this.review.pieStoreSlug.toUpperCase()}`;
  }

  get sk(): string {
    return `REVIEW#${this.review.id.toString().toUpperCase()}`;
  }

  toItem(): Record<string, AttributeValue> {
    return marshall({
      ...this.keys(),
      ...this.review,
    }, { convertClassInstanceToMap: true, removeUndefinedValues: true });
  }
}
