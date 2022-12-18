import { Ok, Result } from 'oxide.ts';
import { Paginated } from '../../../../libs/domain';
import { QueryBase } from '../../../../libs/domain/query.base';
import { PieStoreModel } from '../../database/pie-store.repository';
import { PieStoreRepositoryPort } from '../../database/pie-store.repository.port';
import { FindPieStoreQuery, FindPieStoresQuery } from './find-pie-stores.query';

export interface QueryHandler<T> {
  execute(query: QueryBase): Promise<T>;
}

export class FindPieStoresService
implements QueryHandler<Result<Paginated<PieStoreModel>, Error>> {
  constructor(protected readonly pieStoreRepository: PieStoreRepositoryPort) {}

  async execute(query: FindPieStoresQuery) {
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

export class FindPieStoreService
implements QueryHandler<Result<PieStoreModel, Error>> {
  constructor(protected readonly pieStoreRepository: PieStoreRepositoryPort) {}

  async execute(query: FindPieStoreQuery) {
    try {
      const record = await this.pieStoreRepository.findOneBySlug(query);

      return Ok(record);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
