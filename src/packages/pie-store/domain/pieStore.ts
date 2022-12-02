import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityId';

export type IPieStore = {
  name: string;
}

export class PieStore extends Entity<IPieStore> {

  public get name() : string {
    return this.props.name;
  }

  static create(pieStoreProps: { name: string }, id? : UniqueEntityID) {
    const validatePieStoreProps = pieStoreProps && pieStoreProps.name && pieStoreProps.name !== '';

    if (validatePieStoreProps) {
      return new PieStore(pieStoreProps, id);
    } else {
      throw new Error('Invalid props passed in to PieStore');
    }
  }

  private constructor(props: IPieStore, id?: UniqueEntityID) {
    super(props, id);
  }

}