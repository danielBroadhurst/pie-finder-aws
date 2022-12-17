import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { EventEmitterPort } from '../../ports/event-emitter.port';
import { getEventClient } from './event-bridge.client';

export class EventClient implements EventEmitterPort {
  client: EventBridgeClient;

  constructor() {
    this.client = getEventClient();
  }

  publishEvent(eventType: string, eventDetail: any): Promise<boolean> {
    console.log(eventType, eventDetail);
    throw new Error('Not Implemented Yet');
  }
}