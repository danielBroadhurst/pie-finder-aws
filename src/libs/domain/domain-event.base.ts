import { ulid } from 'ulid';
import { RequestContextService } from '../application/context/app-context.services';
import { ArgumentNotProvidedException } from '../exceptions';
import { Guard } from '../guard';

export type DomainEventProps<T> = Omit<
T,
'id' | 'timestamp' | 'correlationId' | 'eventName'
> & {
  aggregateId: string;
  correlationId?: string;
  causationId?: string;
  timestamp?: number;
};

export abstract class DomainEvent {
  public readonly id: string;

  /** Aggregate ID where domain event occurred */
  public readonly aggregateId: string;

  /** Timestamp when this domain event occurred */
  public readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  public correlationId: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  public causationId?: string;

  constructor(props: DomainEventProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    }
    this.id = ulid();
    this.aggregateId = props.aggregateId;
    this.timestamp = props.timestamp || Date.now();
    this.correlationId =
      props.correlationId || RequestContextService.getRequestId();
  }
}