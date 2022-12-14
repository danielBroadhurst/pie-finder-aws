import { UseCase } from '../../../core/domain/UseCase';
import { Result } from '../../../core/logic/Result';
import { PieStore } from '../domain/PieStore';
import { IPieStoreRepository } from '../repository/PieStoreRepository';

interface CreatePieStoreUseCaseRequestDTO {
  name: string;
  pieStoreSlug: string;
}

export class CreatePieStoreUseCase implements UseCase<CreatePieStoreUseCaseRequestDTO, Result<PieStore>> {
  pieStoreRepository: IPieStoreRepository;

  constructor(pieStoreRepository: IPieStoreRepository) {
    this.pieStoreRepository = pieStoreRepository;
  }

  public async execute(request: CreatePieStoreUseCaseRequestDTO): Promise<Result<PieStore>> {
    try {
      const pieStoreOrError = PieStore.create({
        storeName: request.name,
        pieStoreSlug: request.pieStoreSlug,
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