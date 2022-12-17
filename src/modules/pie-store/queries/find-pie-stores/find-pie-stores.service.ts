import { Ok, Result } from 'oxide.ts';
import { Paginated } from '../../../../libs/domain';
import { QueryBase } from '../../../../libs/domain/query.base';
import { PieStoreModel } from '../../database/pie-store.repository';
import { PieStoreRepositoryPort } from '../../database/pie-store.repository.port';
import { FindPieStoresQuery } from './find-pie-stores.query';

export interface QueryHandler {
  execute(
    command: QueryBase
  ): Promise<Result<Paginated<PieStoreModel>, Error>>;
}

export class FindPieStoresService implements QueryHandler {
  constructor(protected readonly pieStoreRepository: PieStoreRepositoryPort) {}

  async execute(query: FindPieStoresQuery): Promise<Result<Paginated<PieStoreModel>, Error>> {
    try {
      const records = await this.pieStoreRepository.findAllPaginated({
        limit: 10,
        page: 1,
        offset: 0,
        orderBy: { field: 'name', param: 'asc' },
      });

      return Ok(
        new Paginated({
          data: records.data,
          limit: query.limit,
          page: query.page,
          count: records.count,
        }),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}