import { PieStoreDynamoDb } from '../data-store/pie-store/ddb-pie-store';
import { ReviewDynamoDB } from '../data-store/review/ddb-review';
import { PieStoreRepository } from './PieStoreRepository';
import { ReviewRepository } from './ReviewRepository';

const pieStoreRepository = new PieStoreRepository(new PieStoreDynamoDb);
const reviewRepository = new ReviewRepository(new ReviewDynamoDB);

export {
  pieStoreRepository,
  reviewRepository,
};
