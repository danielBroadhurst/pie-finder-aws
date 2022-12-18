import { PaginatedQueryParams, QueryParams, RepositoryPort } from '../../../libs/domain';
import { PieStoreEntity } from '../domain/pie-store.entity';
import { FindPieStoreQuery } from '../queries/find-pie-stores/find-pie-stores.query';
import { PieStoreModel } from './pie-store.repository';

export interface FindPieStoresParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
  readonly pieStoreSlug?: string;
}

export interface FindPieStoreParams extends QueryParams {
  readonly pieStoreSlug: string;
}

export interface PieStoreRepositoryPort extends RepositoryPort<PieStoreEntity> {
  findOneBySlug(params: FindPieStoreQuery): Promise<PieStoreModel>;
}