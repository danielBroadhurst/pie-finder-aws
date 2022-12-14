import { pieStoreRepository } from '../repository';
import { CreatePieStoreUseCase } from './CreatePieStoreUseCase';
import { GetPieStoresUseCase } from './GetPieStoresUseCase';

const createPieStoreUseCase = new CreatePieStoreUseCase(pieStoreRepository);
const getPieStoresUseCase = new GetPieStoresUseCase(pieStoreRepository);

export {
  createPieStoreUseCase,
  getPieStoresUseCase,
};