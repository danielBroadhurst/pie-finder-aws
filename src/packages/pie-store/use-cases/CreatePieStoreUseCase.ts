import { UseCase } from '../../../core/domain/UseCase';
import { Result } from '../../../core/logic/Result';
import { PieStore } from '../domain/PieStore';
import { Address } from '../domain/StoreAddress';
import { PieStoreMap } from '../mappers/PieStoreMap';
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
      const pieStoreProps = PieStoreMap.toDomain({
        pieStoreSlug: request.pieStoreSlug,
        storeName: request.storeName,
        address: request.storeAddress,
      });
      const pieStoreOrError = PieStore.create(pieStoreProps);
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