import { RequestContextService } from '../application/context/app-context.services';
import { EventEmitterPort } from '../ports/event-emitter.port';
import { LoggerPort } from '../ports/logger.port';
import { DomainEvent } from './domain-event.base';
import { Entity } from './entity.base';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(
    logger: LoggerPort,
    eventClient: EventEmitterPort,
  ): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `[${RequestContextService.getRequestId()}] "${
            event.constructor.name
          }" event published for aggregate ${this.constructor.name} : ${
            this.id
          }`,
        );
        return eventClient.publishEvent(event.constructor.name, event);
      }),
    );
    this.clearEvents();
  }
}