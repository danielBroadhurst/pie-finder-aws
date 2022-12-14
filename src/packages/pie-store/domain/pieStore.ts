import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { PieStoreCreatedEvent } from './events/PieStoreCreatedEvent';
import { PieStoreId } from './PieStoreId';
import { StoreAddress } from './StoreAddress';
import { StoreName } from './StoreName';

export type IPieStore = {
  storeAddress: StoreAddress;
  dateAdded?: string | undefined;
  description?: string;
  pieStoreSlug: string;
  phoneNumber?: string;
  storeName: StoreName;
}

export class PieStore extends AggregateRoot<IPieStore> {

  public get pieStoreId() : PieStoreId {
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

  public get dateAdded() {
    return this.props.dateAdded;
  }

  static create(props: IPieStore, id? : UniqueEntityID) {
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