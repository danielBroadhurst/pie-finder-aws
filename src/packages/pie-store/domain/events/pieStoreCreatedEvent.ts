import { IDomainEvent } from '../../../../core/domain/events/IDomainEvent';
import { UniqueEntityID } from '../../../../core/domain/UniqueEntityId';
import { PieStoreId } from '../PieStoreId';

export class PieStoreCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public pieStoreId: PieStoreId;

  constructor (pieStoreId: PieStoreId) {
    this.pieStoreId = pieStoreId;
    this.dateTimeOccurred = new Date();
  }

  public getAggregateId (): UniqueEntityID {
    return this.pieStoreId.id;
  }
}