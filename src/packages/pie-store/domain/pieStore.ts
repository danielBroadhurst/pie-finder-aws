import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { PieStoreCreatedEvent } from './events/PieStoreCreatedEvent';
import { PieStoreId } from './PieStoreId';
import { Review } from './Review';
import { StoreAddress } from './StoreAddress';
import { StoreName } from './StoreName';

export type Rating = 1 | 2 | 3 | 4 | 5

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type PriceRange = 'cheap' | 'reasonable' | 'expensive'

export type OpeningTime = {
  [key in Day]: {
    opening: string;
    closing: string;
  };
};

export type IPieStore = {
  dateAdded?: string | undefined;
  description?: string;
  images?: string[];
  openingTimes?: OpeningTime[];
  pieStoreSlug: string;
  phoneNumber?: string;
  priceRange?: PriceRange;
  rating?: Rating;
  reviews?: Review[];
  storeAddress: StoreAddress;
  storeName: StoreName;
  tags?: string[];
  website?: string;
}

export class PieStore extends AggregateRoot<IPieStore> {

  public get pieStoreId(): PieStoreId {
    return PieStoreId.create(this.id);
  }

  public get pieStoreSlug() {
    return this.props.pieStoreSlug;
  }

  public get storeName(): StoreName {
    return this.props.storeName;
  }

  public get storeAddress(): StoreAddress {
    return this.props.storeAddress;
  }

  public get description() {
    return this.props.description;
  }

  public get images() {
    return this.props.images;
  }

  public get openingTimes() {
    return this.props.openingTimes;
  }

  public get phoneNumber() {
    return this.props.phoneNumber;
  }

  public get priceRange() {
    return this.props.priceRange;
  }

  public get rating() {
    return this.props.rating;
  }

  public get reviews() {
    return this.props.reviews;
  }

  public get reviewsCount() {
    return this.props.reviews?.length;
  }

  public get tags() {
    return this.props.tags;
  }

  public get website() {
    return this.props.website;
  }

  public get dateAdded() {
    return this.props.dateAdded;
  }

  static create(props: IPieStore, id?: UniqueEntityID) {
    const validateProps = Guard.againstNullOrUndefinedBulk([
      { argument: props.pieStoreSlug, argumentName: 'pieStoreSlug' },
    ]);

    if (!validateProps.succeeded) {
      return Result.fail<PieStore>(validateProps.message);
    }

    const pieStore = new PieStore({
      ...props,
      dateAdded: props.dateAdded ? props.dateAdded : new Date().toISOString(),
    }, id);

    const isNewlyCreated = !!id === false;

    if (isNewlyCreated) {
      pieStore.addDomainEvent(new PieStoreCreatedEvent(pieStore.pieStoreId));
    }
    return Result.ok<PieStore>(pieStore);
  }

  private constructor(props: IPieStore, id?: UniqueEntityID) {
    super(props, id);
  }
}