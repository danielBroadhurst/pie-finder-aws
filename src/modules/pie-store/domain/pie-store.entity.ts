import { ulid } from 'ulid';
import { AggregateID } from '../../../libs/domain';
import { AggregateRoot } from '../../../libs/domain/aggregate-root.base';
import { PieStoreCreatedEvent } from './events/pie-store-created.domain-event';
import { CreatePieStoreProps, PieStoreProps } from './pie-store.types';

export class PieStoreEntity extends AggregateRoot<PieStoreProps> {
  static create(create: CreatePieStoreProps): PieStoreEntity {
    const id = ulid();
    /* Setting a default role since we are not accepting it during creation. */
    const props: PieStoreProps = { ...create };
    const pieStore = new PieStoreEntity({ id, props });
    /* adding "UserCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action. Multiple events can be added if needed. */
    pieStore.addEvent(
      new PieStoreCreatedEvent({
        aggregateId: id,
        pieStoreSlug: props.pieStoreSlug,
      }),
    );
    return pieStore;
  }

  protected _id: AggregateID = this.id;

  public get pieStoreSlug(): string {
    return this.props.pieStoreSlug;
  }

  public get storeName() {
    return this.props.storeName;
  }

  public get storeAddress() {
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

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}