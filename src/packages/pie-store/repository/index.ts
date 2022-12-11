import { PieStoreDynamoDb } from '../data-store/ddb-pie-store';
import { PieStoreRepository } from './PieStoreRepository';

const pieStoreRepository = new PieStoreRepository(new PieStoreDynamoDb);

export {
  pieStoreRepository,
};
