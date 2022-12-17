import { Review } from '../../review/domain/review.entity';
import { Address } from './value-objects/address.value-object';

export type PieStoreProps = {
  dateAdded?: string | undefined;
  description?: string;
  images?: string[];
  openingTimes?: OpeningTime[];
  pieStoreSlug: string;
  phoneNumber?: string;
  priceRange?: PriceRange;
  rating?: Rating;
  reviews?: Review[];
  storeAddress: Address;
  storeName: string;
  tags?: string[];
  website?: string;
}

export type CreatePieStoreProps = {
  pieStoreSlug: string;
  storeName: string;
  storeAddress: Address;
}

export type Rating = 1 | 2 | 3 | 4 | 5

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type PriceRange = 'cheap' | 'reasonable' | 'expensive'

export type OpeningTime = {
  [key in Day]: {
    opening: string;
    closing: string;
  };
};