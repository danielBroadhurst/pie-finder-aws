import { pieStoreRepository, reviewRepository } from '../repository';
import { AddPieStoreReviewUseCase } from './AddPieStoreReviewUseCase';
import { CreatePieStoreUseCase } from './CreatePieStoreUseCase';
import { GetPieStoresUseCase } from './GetPieStoresUseCase';

// Pie Store
const createPieStoreUseCase = new CreatePieStoreUseCase(pieStoreRepository);
const getPieStoresUseCase = new GetPieStoresUseCase(pieStoreRepository);

// Reviews
const addPieStoreReviewUseCase = new AddPieStoreReviewUseCase(reviewRepository);

export {
  // Pie Store
  createPieStoreUseCase,
  getPieStoresUseCase,

  // Reviews
  addPieStoreReviewUseCase,
};