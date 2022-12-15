import { Entity } from '../../../core/domain/Entity';

import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';

export class UserId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  static create (id?: UniqueEntityID): UserId {
    return new UserId(id);
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id);
  }
}