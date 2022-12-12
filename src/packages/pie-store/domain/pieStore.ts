import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { PieStoreCreatedEvent } from './events/PieStoreCreatedEvent';
import { PieStoreId } from './PieStoreId';

export type IPieStore = {
  pieStoreSlug: string;
  name?: string;
  dateAdded?: string | undefined;
}

export class PieStore extends AggregateRoot<IPieStore> {

  public get pieStoreId() : PieStoreId {
    return PieStoreId.create(this.id);
  }

  public get name() {
    return this.props.name;
  }

  public get pieStoreSlug() {
    return this.props.pieStoreSlug;
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