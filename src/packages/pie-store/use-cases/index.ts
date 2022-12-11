import { pieStoreRepository } from '../repository';
import { CreatePieStoreUseCase } from './CreatePieStoreUseCase';

const createPieStoreUseCase = new CreatePieStoreUseCase(pieStoreRepository);

export {
  createPieStoreUseCase,
};