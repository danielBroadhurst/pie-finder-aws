import { PaginatedParams, PaginatedQueryBase, QueryBase } from '../../../../libs/domain/query.base';

export class FindPieStoresQuery extends PaginatedQueryBase {
  readonly country?: string;

  readonly postalCode?: string;

  readonly street?: string;

  constructor(props: PaginatedParams<FindPieStoresQuery>) {
    super(props);
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }
}

export class FindPieStoreQuery extends QueryBase {
  readonly pieStoreSlug: string;

  constructor(props: FindPieStoreQuery) {
    super();
    this.pieStoreSlug = props.pieStoreSlug;
  }
}