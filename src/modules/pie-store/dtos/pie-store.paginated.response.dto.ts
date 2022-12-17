import { PaginatedResponseDto } from '../../../libs/api/paginated.response.base';
import { PieStoreResponseDto } from './pie-store.response.dto';

export class PieStorePaginatedResponseDto extends PaginatedResponseDto<PieStoreResponseDto> {
  readonly data!: readonly PieStoreResponseDto[];
}