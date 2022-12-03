import { Entity } from '../../../core/domain/Entity';

import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';

export class PieStoreId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  public static create (id?: UniqueEntityID): PieStoreId {
    return new PieStoreId(id);
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id);
  }
}