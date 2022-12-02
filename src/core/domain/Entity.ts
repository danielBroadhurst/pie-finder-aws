import { UniqueEntityID } from './UniqueEntityId';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  protected props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ? id : new UniqueEntityID();
  }
}