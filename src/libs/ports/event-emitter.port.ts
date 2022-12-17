export interface EventEmitterPort {
  publishEvent(eventType: string, eventDetail: any): Promise<boolean>;
}
