import { PaginatedParams, PaginatedQueryBase } from '../../../../libs/domain/query.base';

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