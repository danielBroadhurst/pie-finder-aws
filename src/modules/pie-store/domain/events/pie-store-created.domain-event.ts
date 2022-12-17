import { DomainEvent, DomainEventProps } from '../../../../libs/domain';

export class PieStoreCreatedEvent extends DomainEvent {
  readonly pieStoreSlug: string;

  constructor (props: DomainEventProps<PieStoreCreatedEvent>) {
    super(props);
    this.pieStoreSlug = props.pieStoreSlug;
  }
}

