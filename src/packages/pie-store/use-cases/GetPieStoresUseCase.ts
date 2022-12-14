import { UseCase } from '../../../core/domain/UseCase';
import { Result } from '../../../core/logic/Result';
import { PieStore } from '../domain/PieStore';
import { IPieStoreRepository } from '../repository/PieStoreRepository';

interface GetPieStoreUseCaseRequestDTO {}

export class GetPieStoresUseCase implements UseCase<GetPieStoreUseCaseRequestDTO, Result<PieStore[] | PieStore>> {
  pieStoreRepository: IPieStoreRepository;

  constructor(pieStoreRepository: IPieStoreRepository) {
    this.pieStoreRepository = pieStoreRepository;
  }

  public async execute(request: GetPieStoreUseCaseRequestDTO): Promise<Result<PieStore[] | PieStore>> {
    console.log(request);
    try {
      const pieStores = await this.pieStoreRepository.getPieStores();
      return Result.ok<PieStore[]>(pieStores);
    } catch (error) {
      return Result.fail<PieStore>(error);
    }
  }
}