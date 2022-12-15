import { UseCase } from '../../../core/domain/UseCase';
import { Result } from '../../../core/logic/Result';
import { PieStore } from '../domain/PieStore';
import { Address, StoreAddress } from '../domain/StoreAddress';
import { StoreName } from '../domain/StoreName';
import { IPieStoreRepository } from '../repository/PieStoreRepository';

interface CreatePieStoreUseCaseRequestDTO {
  storeName: string;
  pieStoreSlug: string;
  storeAddress: Address;
}

export class CreatePieStoreUseCase implements UseCase<CreatePieStoreUseCaseRequestDTO, Result<PieStore>> {
  pieStoreRepository: IPieStoreRepository;

  constructor(pieStoreRepository: IPieStoreRepository) {
    this.pieStoreRepository = pieStoreRepository;
  }

  public async execute(request: CreatePieStoreUseCaseRequestDTO): Promise<Result<PieStore>> {
    try {
      const pieStoreOrError = PieStore.create({
        pieStoreSlug: request.pieStoreSlug,
        storeName: StoreName.create(request.storeName).getValue(),
        storeAddress: StoreAddress.create(request.storeAddress).getValue(),
      });
      if (pieStoreOrError.isFailure) {
        return Result.fail<PieStore>(pieStoreOrError.error);
      };
      const pieStore = pieStoreOrError.getValue();
      await this.pieStoreRepository.save(pieStore);
      return Result.ok<PieStore>(pieStore);
    } catch (error) {
      return Result.fail<PieStore>(error);
    }
  }
}