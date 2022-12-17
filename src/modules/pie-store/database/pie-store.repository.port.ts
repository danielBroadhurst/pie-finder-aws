import { PaginatedQueryParams, RepositoryPort } from '../../../libs/domain';
import { PieStoreEntity } from '../domain/pie-store.entity';

export interface FindPieStoreParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
  readonly pieStoreSlug?: string;
}

export interface PieStoreRepositoryPort extends RepositoryPort<PieStoreEntity> {
  findOneBySlug(pieStoreSlug: string): Promise<PieStoreEntity | null>;
}