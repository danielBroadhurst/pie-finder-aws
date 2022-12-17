import { LoggerPort } from '../../../ports/logger.port';

export class Logger implements LoggerPort {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  log(message: string, ...meta: unknown[]): void {
    console.log(message, meta);
  }
  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    console.error(message, trace, meta);
  }
  warn(message: string, ...meta: unknown[]): void {
    console.warn(message, meta);
  }
  debug(message: string, ...meta: unknown[]): void {
    console.debug(message, meta);
  }
}