import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';
import { Guard } from '../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import { PieStoreCreatedEvent } from './events/pieStoreCreatedEvent';
import { PieStoreId } from './pieStoreId';

export type IPieStore = {
  name: string;
  dateAdded?: Date | undefined;
}

export class PieStore extends AggregateRoot<IPieStore> {

  public get pieStoreId() : PieStoreId {
    return PieStoreId.create(this.id);
  }

  public get name() {
    return this.props.name;
  }

  public get dateAdded() {
    return this.props.dateAdded;
  }

  static create(props: IPieStore, id? : UniqueEntityID) {
    const validateProps = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
    ]);

    if (!validateProps.succeeded) {
      return Result.fail<PieStore>(validateProps.message);
    }

    const pieStore = new PieStore({
      ...props,
      dateAdded: props.dateAdded ? props.dateAdded : new Date(),
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